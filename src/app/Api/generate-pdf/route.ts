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

    // Convert MCQ data to the format expected by the PDF generator
    const convertedData = convertMCQDataForPDF(template.mcqs, primaryData)

    // Generate HTML content
    const htmlContent = generatePDFHTML(convertedData, primaryData)

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

function convertMCQDataForPDF(mcqs: any[], primaryData: any) {
  const cqData: any[] = []
  let globalQuestionIndex = 1 // Global counter for all questions

  mcqs.forEach((mcq) => {
    if (mcq.mcqType === "mcq-4") {
      // Handle passage-based questions - only sub-questions get counted
      const questions = mcq.subQuestions.map((subQ: any) => ({
        id: globalQuestionIndex++, // Each sub-question gets global index
        question: subQ.questionText || "",
        imgSrc: subQ.image || "",
        mark: subQ.marks || 1,
        options: subQ.options || [],
        hasOptions: true,
      }))

      cqData.push({
        id: null, // MCQ-4 passage itself doesn't get counted
        passage: mcq.passage || "",
        passageImgSrc: mcq.passageImage || "",
        questions,
        hasMainOptions: false,
        options: [],
        mcqType: "mcq-4",
        isPassageOnly: true, // Flag to indicate this is just passage
      })
    } else {
      // Handle regular MCQs - they get counted normally
      cqData.push({
        id: globalQuestionIndex++, // Regular MCQs get global index
        passage: mcq.questionText || "",
        passageImgSrc: mcq.image || "",
        questions: [],
        hasMainOptions: true,
        options: mcq.options || [],
        infoItems: mcq.infoItems || [],
        mcqType: mcq.mcqType,
        isPassageOnly: false,
      })
    }
  })

  return cqData
}

function generatePDFHTML(cqData: any[], primaryData: any) {
  const institutionName = primaryData.institutionName || "Institution Name"
  const examName = primaryData.examName || "Exam Name"
  const subject = primaryData.subject || "Subject"
  const paper = primaryData.paper !== "none" ? ` (${primaryData.paper})` : ""
  const className = primaryData.class || "Class"
  const totalMark = primaryData.totalMark || "Total Mark"
  const subjectCode = primaryData.subjectCode || "Subject Code"
  const totalTime = primaryData.totalTime || "Total Time"
  const message = ""

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>MCQ</title>
<style>
  body {
    width: 816px;
    height: 1344px;
    border: 1px solid #ccc;
    background: white;
    margin: 0;
    padding: 0;
  }
  .parent{
    height: 100%;
    display: grid;
    grid-template-rows: repeat(64, 1fr);
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .headerPage1{
    grid-row: 1 / 10;
    grid-column: 1 / 3;
    padding: 30px 20px 5px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
  }
  .headerPage2{
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
  }
  .qPage1-Right {
    grid-row: 10 / 42;
    grid-column: 2 / 3;
    padding: 10px 20px 10px 10px;
    box-sizing: border-box;
  }
  .qPage2-Left {
    grid-row: 4 / 42;
    grid-column: 1 / 2;
    padding: 10px 10px 10px 20px;
    box-sizing: border-box;
    border-right: 1px solid black;
  }
  .qPage2-Right {
    grid-row: 4 / 42;
    grid-column: 2 / 3;
    padding: 10px 20px 10px 10px;
    box-sizing: border-box;
  }
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
  }
</style>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
<body>
<script>
const cqData = ${JSON.stringify(cqData)};
const institutionName = "${institutionName}";
const examName = "${examName}";
const subject = "${subject}";
const paper = "${paper}";
const className = "${className}";
const totalMark = ${totalMark};
const subjectCode = "${subjectCode}";
const totalTime = "${totalTime}";
const message = "${message}";

window.MathJax = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']]
  }
};

document.addEventListener('DOMContentLoaded', function() {
  generatePDF();
});

function generatePDF() {
  console.log('Starting PDF generation with data:', cqData);
  
  if (!cqData || cqData.length === 0) {
    console.error('No MCQ data found');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>No MCQ data found!</h2><p>Please create some MCQs first.</p></div>';
    return;
  }

  const totalQuestions = cqData.reduce((count, item) => {
    if (item.mcqType === "mcq-4") {
      return count + (item.questions ? item.questions.length : 0);
    } else {
      return count + 1;
    }
  }, 0);

  const template = \`
    <div class="parent" id="parent1">
      <div class="headerPage1">
        <table style="width: 100%; font-size: 12px;">
          <tr style="height: 80px;">
            <td colspan="3" style="text-align: center; font-size: 28px;">\${institutionName}</td>
          </tr>
          <tr>
            <td style="text-align: left; width: 33.33%;"><b>পরীক্ষাঃ </b>\${examName}</td>
            <td style="text-align: left; width: 33.33%;"><b>বিষয়ঃ </b>\${subject}\${paper}</td>
            <td style="text-align: left; width: 33.33%;"><b>শ্রেণীঃ </b>\${className}</td>
          </tr>
          <tr>
            <td style="text-align: left;"><b>বিষয় কোডঃ </b>\${subjectCode}</td>
            <td style="text-align: left;"><b>পূর্ণমানঃ </b>\${totalMark}</td>
            <td style="text-align: left;"><b>সময়ঃ </b>\${totalTime}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: left;"><b>বিঃদ্রঃ</b> উত্তরপত্রে ক্রমিক নম্বরের বিপরীতে সর্বমোট \${totalQuestions} টি প্রশ্ন লিখো। প্রতিটি প্রশ্নের ডান পাশে মান সংযুক্ত রয়েছে।</td>
          </tr>
        </table>
      </div>
      <div class="qPage1-Left" id="page1Left"></div>
      <div class="qPage1-Right" id="page1Right"></div>
    </div>
    <div class="parent" id="parent2">
      <div class="headerPage2" style="text-align: center; margin: 0; font-size: 12px;">\${message}</div>
      <div class="qPage2-Left" id="page2Left"></div>
      <div class="qPage2-Right" id="page2Right"></div>
    </div>
  \`;

  document.body.innerHTML = template;

  let allContent = '';
  let containerFontSize = 16;
  
  cqData.forEach((item) => {
    if (item.mcqType === "mcq-4") {
      allContent += \`<div style="margin-bottom: 15px;">
        <div style="text-align: justify; font-weight: bold; margin-bottom: 8px;">
          \${item.passage}
        </div>\`;
      
      if (item.passageImgSrc) {
        allContent += \`<div style="width: 100%; text-align: center; margin: 10px 0;">
          <img src="\${item.passageImgSrc}" alt="Image" style="max-height: 120px; max-width: 100%;">
        </div>\`;
      }

      if (item.questions && item.questions.length > 0) {
        allContent += \`<div style="padding-left: 15px;">\`;

        item.questions.forEach((ques) => {
          allContent += \`<div style="margin: 8px 0; text-align: justify; font-weight: bold;">
            \${ques.id}. \${ques.question}
          </div>\`;

          if (ques.imgSrc) {
            allContent += \`<div style="text-align: center; margin: 8px 0;">
              <img src="\${ques.imgSrc}" alt="Question Image" style="max-height: 100px; max-width: 100%;">
            </div>\`;
          }

          if (ques.options && ques.options.length > 0) {
            allContent += \`<div style="margin: 5px 0; padding-left: 20px;">\`;
            const subLabels = ["ক", "খ", "গ", "ঘ"];
            ques.options.forEach((option, optIdx) => {
              if (option && option.trim()) {
                const textLength = option.length;
                let lineStyle = "";

                if (textLength <= 25) {
                  lineStyle = "display: inline-block; margin-right: 15px; margin-bottom: 3px; white-space: nowrap;";
                } else if (textLength <= 60) {
                  lineStyle = "display: block; margin-bottom: 6px; line-height: 1.3; max-width: 250px;";
                } else {
                  lineStyle = "display: block; margin-bottom: 8px; line-height: 1.4; max-width: 230px; word-wrap: break-word;";
                }

                allContent += \`<div style="\${lineStyle} text-align: justify;">
                  <b>\${subLabels[optIdx]}</b> \${option}
                </div>\`;
              }
            });
            allContent += \`</div>\`;
          }
        });

        allContent += \`</div>\`;
      }

      allContent += \`</div>\`;
    } else {
      allContent += \`<div style="margin-bottom: 15px;">
        <div style="text-align: justify; font-weight: bold; margin-bottom: 8px;">
          \${item.id}. \${item.passage}
        </div>\`;

      if (item.passageImgSrc) {
        allContent += \`<div style="width: 100%; text-align: center; margin: 10px 0;">
          <img src="\${item.passageImgSrc}" alt="Image" style="max-height: 120px; max-width: 100%;">
        </div>\`;
      }

      if (item.hasMainOptions && item.options && item.options.length > 0) {
        if (item.mcqType === "mcq-3") {
          if (item.infoItems && item.infoItems.length > 0) {
            allContent += \`<div style="margin: 10px 0; padding-left: 15px;">\`;
            item.infoItems.forEach((info, infoIdx) => {
              const infoLabels = ["i", "ii", "iii"];
              if (info && info.trim()) {
                allContent += \`<div style="margin: 5px 0; text-align: justify;">\${infoLabels[infoIdx]}. \${info}</div>\`;
              }
            });
            allContent += \`</div>\`;
          }

          allContent += \`<div style="margin: 10px 0; padding-left: 15px; display: flex; flex-wrap: wrap; gap: 15px;">\`;
          const labels = ["ক", "খ", "গ", "ঘ"];
          item.options.forEach((option, optIdx) => {
            if (option && option.trim()) {
              allContent += \`<span style="white-space: nowrap;">
                <b>\${labels[optIdx]}</b> \${option}
              </span>\`;
            }
          });
          allContent += \`</div>\`;
        } else {
          allContent += \`<div style="margin: 10px 0; padding-left: 15px;">\`;
          const labels = ["ক", "খ", "গ", "ঘ"];
          item.options.forEach((option, optIdx) => {
            if (option && option.trim()) {
              const textLength = option.length;
              let lineStyle = "";

              if (textLength <= 30) {
                lineStyle = "display: inline-block; margin-right: 20px; margin-bottom: 5px; white-space: nowrap;";
              } else if (textLength <= 80) {
                lineStyle = "display: block; margin-bottom: 8px; line-height: 1.4; max-width: 300px;";
              } else {
                lineStyle = "display: block; margin-bottom: 12px; line-height: 1.5; max-width: 280px; word-wrap: break-word;";
              }

              allContent += \`<div style="\${lineStyle} text-align: justify;">
                <b>\${labels[optIdx]}</b> \${option}
              </div>\`;
            }
          });
          allContent += \`</div>\`;
        }
      }

      allContent += \`</div>\`;
    }
  });

  const portions = [
    { id: "page1Left", maxHeight: 800 },
    { id: "page1Right", maxHeight: 800 },
    { id: "page2Left", maxHeight: 900 },
    { id: "page2Right", maxHeight: 900 }
  ];

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = allContent;
  tempDiv.style.fontSize = containerFontSize + 'px';
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.width = '350px';
  document.body.appendChild(tempDiv);

  const contentElements = Array.from(tempDiv.children);
  let currentPortionIndex = 0;
  
  contentElements.forEach(element => {
    if (currentPortionIndex < portions.length) {
      const targetElement = document.getElementById(portions[currentPortionIndex].id);
      if (targetElement) {
        targetElement.appendChild(element.cloneNode(true));
        
        if (targetElement.children.length > 3) {
          currentPortionIndex++;
        }
      }
    }
  });

  document.body.removeChild(tempDiv);

  document.getElementById("parent1").style.fontSize = containerFontSize + 'px';
  document.getElementById("parent2").style.fontSize = containerFontSize + 'px';

  console.log('PDF content generated successfully');

  setTimeout(() => {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = 'Print PDF';
    printBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;padding:10px 15px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;font-size:14px;';
    printBtn.onclick = () => {
      printBtn.style.display = 'none';
      window.print();
      setTimeout(() => printBtn.style.display = 'block', 1000);
    };
    document.body.appendChild(printBtn);
  }, 1000);
}
</script>
</body>
</html>`
}
