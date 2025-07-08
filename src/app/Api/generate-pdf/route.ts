
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/dbconfig/dbconfig"
import MCQTemplate from "@/Models/mcqTemplate"
import PrimaryQuestionInfo from "@/Models/primaryQuestion"

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const { user, primaryInfo } = body

    console.log("Generate PDF request:", { user, primaryInfo })

    if (!user || !primaryInfo) {
      return NextResponse.json({ success: false, message: "Missing user or primaryInfo" }, { status: 400 })
    }

    // Get primary question info
    const primaryData = await PrimaryQuestionInfo.findById(primaryInfo)
    if (!primaryData) {
      return NextResponse.json({ success: false, message: "Primary question info not found" }, { status: 404 })
    }

    // Get MCQ template data
    const template = await MCQTemplate.findOne({ user, primaryInfo })
    if (!template || !template.mcqs || template.mcqs.length === 0) {
      return NextResponse.json({ success: false, message: "No MCQ data found" }, { status: 404 })
    }

    // Generate HTML content with grid layout
    const htmlContent = generateGridLayoutHTML(template.mcqs, primaryData)

    return NextResponse.json(
      {
        success: true,
        htmlContent,
        message: "PDF HTML generated successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Generate PDF error:", error)
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 })
  }
}

function shuffleArray(array: any[]): any[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function convertMCQsToQuestions(mcqs: any[]) {
  const questions: any[] = []

  mcqs.forEach((mcq) => {
    if (mcq.mcqType === "mcq-4") {
      // Passage-based questions - treat as one complete group
      const passageGroup = {
        type: "passage-group",
        passage: mcq.passage || "",
        passageImage: mcq.passageImage || "",
        subQuestions: mcq.subQuestions || [],
        questionCount: mcq.subQuestions?.length || 0,
      }
      questions.push(passageGroup)
    } else {
      // Regular MCQ - each question is individual
      questions.push({
        type: "regular",
        questionText: mcq.questionText || "",
        image: mcq.image || "",
        options: mcq.options || [],
        mcqType: mcq.mcqType,
        infoItems: mcq.infoItems || [],
      })
    }
  })

  return questions
}

function generateGridLayoutHTML(mcqs: any[], primaryData: any) {
  const totalSet = Number(primaryData.totalSet) || 1
  const institutionName = primaryData.institutionName || "Institution Name"
  const examName = primaryData.examName || "Exam Name"
  const subject = primaryData.subject || "Subject"
  const paper = primaryData.paper !== "none" ? ` ${primaryData.paper}` : ""
  const className = primaryData.class || "Class"
  const totalMark = primaryData.totalMark || "Total Mark"
  const subjectCode = primaryData.subjectCode || "Subject Code"
  const totalTime = primaryData.totalTime || "Total Time"

  const setOptions = ["পদ্মা", "মেঘনা", "যমুনা", "মাতামুহুরি", "হালদা"]

  let allSetsHTML = ""

  for (let setIdx = 0; setIdx < totalSet; setIdx++) {
    // Convert MCQs to question array
    const questionArray = convertMCQsToQuestions(mcqs)

    // Shuffle questions for each set
    const shuffledQuestions = shuffleArray(questionArray)

    // Distribute content across pages
    const pages = distributeContentToGridPages(shuffledQuestions)

    // Generate header info
    const headerInfo = {
      institutionName,
      examName,
      subject,
      paper,
      className,
      totalMark,
      subjectCode,
      totalTime,
      setName: setOptions[setIdx] || setOptions[0],
    }

    // Generate pages
    pages.forEach((pageData, pageIndex) => {
      const isFirstPage = pageIndex === 0
      const isLastPage = pageIndex === pages.length - 1

      allSetsHTML += generateGridPage(pageData, headerInfo, isFirstPage, isLastPage)
    })
  }

  return generateCompleteGridHTML(allSetsHTML)
}

function distributeContentToGridPages(questions: any[]) {
  const pages: any[] = []
  let currentPageContent = {
    leftColumn: "",
    rightColumn: "",
    leftHeight: 0,
    rightHeight: 0,
  }

  const maxColumnHeight = 600 // Approximate height limit per column
  let questionNumber = 1
  let currentColumn = "left"

  questions.forEach((item) => {
    const questionHTML = generateQuestionHTML(item, questionNumber)
    const questionHeight = estimateQuestionHeight(item)

    // Determine which column to use
    if (currentColumn === "left") {
      if (currentPageContent.leftHeight + questionHeight <= maxColumnHeight) {
        currentPageContent.leftColumn += questionHTML
        currentPageContent.leftHeight += questionHeight
      } else if (currentPageContent.rightHeight + questionHeight <= maxColumnHeight) {
        currentPageContent.rightColumn += questionHTML
        currentPageContent.rightHeight += questionHeight
        currentColumn = "right"
      } else {
        // Start new page
        pages.push({ ...currentPageContent })
        currentPageContent = {
          leftColumn: questionHTML,
          rightColumn: "",
          leftHeight: questionHeight,
          rightHeight: 0,
        }
        currentColumn = "left"
      }
    } else {
      if (currentPageContent.rightHeight + questionHeight <= maxColumnHeight) {
        currentPageContent.rightColumn += questionHTML
        currentPageContent.rightHeight += questionHeight
      } else {
        // Start new page
        pages.push({ ...currentPageContent })
        currentPageContent = {
          leftColumn: questionHTML,
          rightColumn: "",
          leftHeight: questionHeight,
          rightHeight: 0,
        }
        currentColumn = "left"
      }
    }

    // Update question number
    if (item.type === "passage-group") {
      questionNumber += item.subQuestions.length
    } else {
      questionNumber++
    }
  })

  // Add remaining content
  if (currentPageContent.leftColumn || currentPageContent.rightColumn) {
    pages.push(currentPageContent)
  }

  return pages
}

function generateQuestionHTML(item: any, questionNumber: number): string {
  let html = ""

  if (item.type === "passage-group") {
    // Passage-based questions
    const subQuestionCount = item.subQuestions.length
    html += `<div class="passage">Read the following stimulus and answer the next ${subQuestionCount} questions.</div>`

    if (item.passage) {
      html += `<div class="passage-text">${item.passage}</div>`
    }

    if (item.passageImage) {
      html += `<div class="passage-image"><img src="${item.passageImage}" alt="Passage Image"></div>`
    }

    // Sub-questions
    let subQuestionNum = questionNumber
    item.subQuestions.forEach((subQ: any) => {
      html += `<div class="question">`
      html += `<span class="question-number">${subQuestionNum}.</span>`
      html += `<span class="question-text">${subQ.questionText || ""}</span>`
      html += `</div>`

      if (subQ.image) {
        html += `<div class="question-image"><img src="${subQ.image}" alt="Question Image"></div>`
      }

      if (subQ.options && subQ.options.length > 0) {
        const optionLayout = determineOptionLayout(subQ.options)
        html += `<div class="options ${optionLayout}">`
        subQ.options.forEach((option: string, idx: number) => {
          const optionLabel = String.fromCharCode(97 + idx)
          html += `<span class="option"><b>${optionLabel})</b> ${option}</span>`
        })
        html += `</div>`
      }

      subQuestionNum++
    })
  } else {
    // Regular question
    html += `<div class="question">`
    html += `<span class="question-number">${questionNumber}.</span>`
    html += `<span class="question-text">${item.questionText}</span>`
    html += `</div>`

    if (item.image) {
      html += `<div class="question-image"><img src="${item.image}" alt="Question Image"></div>`
    }

    // MCQ-3 info items
    if (item.mcqType === "mcq-3" && item.infoItems && item.infoItems.length > 0) {
      html += `<div class="info-items">`
      item.infoItems.forEach((info: string, idx: number) => {
        const infoLabel = ["i", "ii", "iii"][idx] || `${idx + 1}`
        if (info && info.trim()) {
          html += `<div class="info-line">${infoLabel}. ${info}</div>`
        }
      })
      html += `</div>`
    }

    if (item.options && item.options.length > 0) {
      const optionLayout = determineOptionLayout(item.options)
      html += `<div class="options ${optionLayout}">`
      item.options.forEach((option: string, idx: number) => {
        const optionLabel = String.fromCharCode(97 + idx)
        html += `<span class="option"><b>${optionLabel})</b> ${option}</span>`
      })
      html += `</div>`
    }
  }

  return html
}

function determineOptionLayout(options: string[]): string {
  if (!options || options.length === 0) return "options-single"

  // Clean and calculate actual text lengths (excluding HTML tags if any)
  const cleanOptions = options.map((option) => (option || "").trim().replace(/<[^>]*>/g, ""))
  const optionLengths = cleanOptions.map((option) => option.length)

  // Get max length
  const maxLength = Math.max(...optionLengths)
  const totalChars = optionLengths.reduce((sum, len) => sum + len, 0)
  const avgLength = totalChars / optionLengths.length

  console.log("Option analysis:", {
    options: cleanOptions,
    lengths: optionLengths,
    maxLength,
    avgLength,
    totalChars,
  })

  // If ANY option has more than 18 characters, use single line layout
  if (maxLength > 18) {
    console.log("Using single layout - any option > 18 characters")
    return "options-single"
  } else if (maxLength > 10 || avgLength > 8 || totalChars > 40) {
    // Medium options - 2 options per line
    console.log("Using double layout - medium options")
    return "options-double"
  } else {
    // Short options - 4 options in 1 line
    console.log("Using inline layout - short options")
    return "options-inline"
  }
}

function estimateQuestionHeight(item: any): number {
  let height = 40 // Base question height
  if (item.type === "passage-group") {
    height += 60 // Passage header
    if (item.passage) height += Math.ceil(item.passage.length / 100) * 20
    if (item.passageImage) height += 100
    item.subQuestions.forEach((subQ: any) => {
      height += 40
      if (subQ.questionText) height += Math.ceil(subQ.questionText.length / 80) * 20
      if (subQ.image) height += 100
      if (subQ.options) height += 30
    })
  } else {
    if (item.questionText) height += Math.ceil(item.questionText.length / 80) * 20
    if (item.image) height += 100
    if (item.infoItems && item.infoItems.length > 0) height += item.infoItems.length * 20
    if (item.options) height += 30
  }
  return height
}

function generateGridPage(pageData: any, headerInfo: any, isFirstPage: boolean, isLastPage: boolean) {
  console.log("Generating page - isFirstPage:", isFirstPage, "isLastPage:", isLastPage) // Debug log

  return `
  <div class="parent">
    ${
      isFirstPage
        ? `
    <div class="headerPage1">
      <table style="width: 100%; font-size: 12px;">
        <tr style="height: 60px;">
          <td colspan="3" style="text-align: center; font-size: 24px; font-weight: bold;">${headerInfo.institutionName}</td>
        </tr>
        <tr>
          <td style="text-align: left; width: 33.33%;"><b>পরীক্ষাঃ </b>${headerInfo.examName}</td>
          <td style="text-align: left; width: 33.33%;"><b>বিষয়ঃ </b>${headerInfo.subject} (${headerInfo.paper})</td>
          <td style="text-align: left; width: 33.33%;"><b>শ্রেণীঃ </b>${headerInfo.className}</td>
        </tr>
        <tr>
          <td style="text-align: left;"><b>সেটঃ </b>${headerInfo.setName}</td>
          <td style="text-align: left;"><b>পূর্ণমানঃ </b>${headerInfo.totalMark}</td>
          <td style="text-align: left;"><b>সময়ঃ </b>${headerInfo.totalTime}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: left; padding-top: 10px;"><b>বিঃদ্রঃ</b> সংযুক্ত উত্তরপত্রে ক্রমিক নম্বরের বিপরীতে সঠিক/ সর্বোত্তম উত্তর বল পয়েন্ট কলম দিয়ে পূরণ করো। প্রতিটি প্রশ্নের মান ১।</td>
        </tr>
      </table>
    </div>
    <div class="qPage1-Left">
      ${pageData.leftColumn}
    </div>
    <div class="qPage1-Right">
      ${pageData.rightColumn}
    </div>
    <div class="omrFront">
      <img src="/uploads/omr.png" width="100%" style="max-width: 770px;" alt="omrImg">
      <table style="width: 420px; font-size: 12px; transform: rotate(90deg); z-index: 1000; margin-left: 480px; position: relative; top: -270px;">
        <tr style="height: 80px;">
          <td colspan="3" style="text-align: center; font-size: 20px; font-weight: bold;">${headerInfo.institutionName}</td>
        </tr>
        <tr>
          <td style="text-align: left; width: 33.33%;"><b>পরীক্ষাঃ </b>${headerInfo.examName}</td>
          <td style="text-align: left; width: 33.33%;"><b>বিষয়ঃ </b>${headerInfo.subject} (${headerInfo.paper})</td>
          <td style="text-align: left; width: 33.33%;"><b>শ্রেণীঃ </b>${headerInfo.className}</td>
        </tr>
        <tr>
          <td style="text-align: left;"><b>সেটঃ </b>${headerInfo.setName}</td>
          <td style="text-align: left;"><b>পূর্ণমানঃ </b>${headerInfo.totalMark}</td>
          <td style="text-align: left;"><b>সময়ঃ </b>${headerInfo.totalTime}</td>
        </tr>
      </table>
    </div>
    `
        : `
    <!-- No header for subsequent pages -->
    <div class="qPage2-Left">
      ${pageData.leftColumn}
    </div>
    <div class="qPage2-Right">
      ${pageData.rightColumn}
    </div>
    <div class="omrBack">
      ${
        isLastPage
          ? `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f9f9f9;">
        <img src="/uploads/instruction.png" style="max-width: 90%; max-height: 300px; object-fit: contain;" alt="OMR Instructions">
        
      </div>
      `
          : `
      <!-- Empty space for non-last pages -->
      <div style="height: 100%; background-color: #ffffff;"></div>
      `
      }
    </div>
    `
    }
  </div>
  `
}

function generateCompleteGridHTML(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>MCQ</title>
  <style>
    body {
      width: 816px;   /* 8.5in * 96dpi */
      height: 1344px; /* 14in * 96dpi */
      border: 1px solid #ccc;
      background: white;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }

    .parent {
      height: 100%;
      display: grid;
      grid-template-rows: repeat(64, 1fr);
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }

    .headerPage1 {
      grid-row: 1 / 10;
      grid-column: 1 / 3;
      padding: 30px 20px 5px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid black;
    }

    .headerPage2 {
      grid-row: 1 / 4;
      grid-column: 1 / 3;
      padding: 30px 20px 5px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid black;
    }

    .qPage1-Left {
      grid-row: 10 / 42;
      grid-column: 1 / 2;
      padding: 10px 10px 10px 20px;
      box-sizing: border-box;
      border-right: 1px solid black;
      overflow: hidden;
    }

    .qPage1-Right {
      grid-row: 10 / 42;
      grid-column: 2 / 3;
      padding: 10px 20px 10px 10px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .qPage2-Left {
      grid-row: 1 / 42;
      grid-column: 1 / 2;
      padding: 10px 10px 10px 20px;
      box-sizing: border-box;
      border-right: 1px solid black;
      overflow: hidden;
    }

    .qPage2-Right {
      grid-row: 1 / 42;
      grid-column: 2 / 3;
      padding: 10px 20px 10px 10px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .omrFront {
      grid-row: 42 / 65;
      grid-column: 1 / 3;
      background-color: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      border-top: 2px dashed black;
    }

    .omrBack {
      grid-row: 42 / 65;
      grid-column: 1 / 3;
      background-color: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      border-top: 2px dashed black;
    }

    .question {
      margin: 12px 0;
      line-height: 1.3;
    }

    .question-number {
      font-weight: bold;
      display: inline;
    }

    .question-text {
      display: inline;
      margin-left: 5px;
    }

    .passage {
      font-weight: bold;
      margin: 20px 0 10px 0;
      font-style: italic;
    }

    .passage-text {
      margin: 10px 0;
      font-weight: normal;
      line-height: 1.5;
      font-style: normal;
    }

    .info-items {
      margin: 9px 0;
      padding-left: 20px;
    }

    .info-line {
      margin: 5px 0;
      line-height: 1.4;
    }

    .options-quad {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 3px 10px;
      align-items: start;
      margin: 6px 0;
    }

    .options-quad .option {
      display: block;
      margin: 0;
      padding: 1px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-size: 13px;
      line-height: 1.3;
    }

    .options-double {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 10px;
      align-items: start;
      margin: 8px 0;
    }

    .options-double .option {
      display: block;
      margin: 0;
      padding: 2px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-size: 14px;
      line-height: 1.4;
    }

    .options-single {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin: 8px 0;
    }

    .options-single .option {
      display: block;
      margin: 0;
      padding: 3px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      width: 100%;
      font-size: 14px;
      line-height: 1.4;
    }

    .option {
      font-size: 14px;
      line-height: 1.4;
    }

    .option b {
      font-weight: bold;
      margin-right: 4px;
    }

    .question-image, .passage-image {
      text-align: center;
      margin: 10px 0;
    }

    .question-image img, .passage-image img {
      max-width: 200px;
      max-height: 100px;
    }

    .print-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }

    .print-btn:hover {
      background: #0056b3;
    }

    /* Page break for printing */
    .parent:nth-child(2) {
      page-break-before: always;
    }

    /* Print styles */
    @media print {
      @page {
        size: legal portrait;
        margin: 0;
      }
      
      body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        border: none;
        box-shadow: none;
      }
      
      .parent {
        page-break-after: always;
      }
      
      .parent:last-child {
        page-break-after: avoid;
      }

      .print-btn {
        display: none !important;
      }
    }

    .omrBack img {
      max-width: 90%;
      max-height: 320px;
      object-fit: contain;
    }

    .options-inline {
      display: flex;
      flex-wrap: wrap;
      gap: 5px 12px;
      align-items: center;
      margin: 6px 0;
    }

    .options-inline .option {
      display: inline-block;
      margin: 0;
      padding: 1px 0;
      font-size: 14px;
      line-height: 1.3;
      white-space: nowrap;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Print PDF</button>
  ${content}
  
  <script>
    // Initialize MathJax
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\$$', '\\\$$']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
      },
      svg: {
        fontCache: 'global'
      }
    };
    
    // Process MathJax after content loads
    document.addEventListener('DOMContentLoaded', function() {
      if (window.MathJax) {
        MathJax.typesetPromise().then(() => {
          console.log('MathJax processing complete');
        }).catch((err) => {
          console.error('MathJax processing failed:', err);
        });
      }
    });
  </script>
</body>
</html>
  `
}
