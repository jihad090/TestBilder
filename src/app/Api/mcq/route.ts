



import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/dbconfig/dbconfig"
import MCQTemplate from "@/Models/mcqTemplate"

await connectDB()

function validateMCQ(mcq: any): boolean {
  console.log(" Validating MCQ:", mcq.mcqType, mcq.id)

  if (mcq.mcqType === "mcq-4") {
    const hasPassageText = mcq.passage && mcq.passage.trim() !== ""
    const hasPassageImage = mcq.passageImage && mcq.passageImage.trim() !== ""

    if (!hasPassageText && !hasPassageImage) {
      console.log(" MCQ-4: No passage text or image")
      return false
    }
    console.log("MCQ-4: Has passage content")

    if (!mcq.subQuestions || !Array.isArray(mcq.subQuestions) || mcq.subQuestions.length === 0) {
      console.log(" MCQ-4: No sub-questions found")
      return false
    }
    console.log(` MCQ-4: Has ${mcq.subQuestions.length} sub-questions`)

    const allSubQuestionsValid = mcq.subQuestions.every((subQ: any, index: number) => {
      console.log(`Validating Sub-Question ${index + 1}:`)

      const hasSubText = subQ.questionText && subQ.questionText.trim() !== ""
      const hasSubImage = subQ.image && subQ.image.trim() !== ""

      if (!hasSubText && !hasSubImage) {
        console.log(`MCQ-4 Sub ${index + 1}: No text or image`)
        return false
      }
      console.log(`MCQ-4 Sub ${index + 1}: Has content (${hasSubText ? "text" : ""}${hasSubImage ? "image" : ""})`)

      if (!subQ.options || !Array.isArray(subQ.options)) {
        console.log(` MCQ-4 Sub ${index + 1}: No options array`)
        return false
      }

      if (subQ.options.length < 4) {
        console.log(` MCQ-4 Sub ${index + 1}: Less than 4 options (has ${subQ.options.length})`)
        return false
      }

      const emptyOptions = subQ.options.map((opt: string, optIndex: number) => {
        const isEmpty = !opt || opt.trim() === ""
        if (isEmpty) {
          console.log(` MCQ-4 Sub ${index + 1}: Option ${optIndex + 1} is empty`)
        }
        return isEmpty
      })

      if (emptyOptions.some((isEmpty: boolean) => isEmpty)) {
        console.log(` MCQ-4 Sub ${index + 1}: Some options are empty`)
        return false
      }
      console.log(` MCQ-4 Sub ${index + 1}: All 4 options have content`)

      if (subQ.correctAnswer === "" || subQ.correctAnswer === null || subQ.correctAnswer === undefined) {
        console.log(` MCQ-4 Sub ${index + 1}: No correct answer`)
        return false
      }

      const answerIndex = Number.parseInt(subQ.correctAnswer)
      if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= subQ.options.length) {
        console.log(` MCQ-4 Sub ${index + 1}: Invalid correct answer index (${subQ.correctAnswer})`)
        return false
      }
      console.log(` MCQ-4 Sub ${index + 1}: Valid correct answer (${answerIndex})`)

      return true
    })

    if (!allSubQuestionsValid) {
      return false
    }

    console.log(" MCQ-4: All validations passed")
    return true
  } else {
    console.log(` Validating ${mcq.mcqType}:`)

    const hasQuestionText = mcq.questionText && mcq.questionText.trim() !== ""
    const hasQuestionImage = mcq.image && mcq.image.trim() !== ""

    if (!hasQuestionText && !hasQuestionImage) {
      console.log(` ${mcq.mcqType}: No question text or image`)
      return false
    }
    console.log(
      ` ${mcq.mcqType}: Has question content (${hasQuestionText ? "text" : ""}${hasQuestionImage ? "image" : ""})`,
    )

    if (!mcq.options || !Array.isArray(mcq.options)) {
      console.log(` ${mcq.mcqType}: No options array`)
      return false
    }

    const requiredOptions = mcq.mcqType === "mcq-2" ? 2 : 4
    if (mcq.options.length < requiredOptions) {
      console.log(` ${mcq.mcqType}: Less than ${requiredOptions} options (has ${mcq.options.length})`)
      return false
    }

    const emptyOptions = mcq.options.slice(0, requiredOptions).map((opt: string, optIndex: number) => {
      const isEmpty = !opt || opt.trim() === ""
      if (isEmpty) {
        console.log(` ${mcq.mcqType}: Option ${optIndex + 1} is empty`)
      }
      return isEmpty
    })

    if (emptyOptions.some((isEmpty: boolean) => isEmpty)) {
      console.log(` ${mcq.mcqType}: Some options are empty`)
      return false
    }
    console.log(` ${mcq.mcqType}: All ${requiredOptions} options have content`)

    // STEP 3: Check correct answer
    if (mcq.correctAnswer === "" || mcq.correctAnswer === null || mcq.correctAnswer === undefined) {
      console.log(` ${mcq.mcqType}: No correct answer`)
      return false
    }

    const answerIndex = Number.parseInt(mcq.correctAnswer)
    if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= requiredOptions) {
      console.log(` ${mcq.mcqType}: Invalid correct answer index (${mcq.correctAnswer})`)
      return false
    }
    console.log(` ${mcq.mcqType}: Valid correct answer (${answerIndex})`)

    // STEP 4: For MCQ-3, check infoItems
    if (mcq.mcqType === "mcq-3") {
      if (!mcq.infoItems || !Array.isArray(mcq.infoItems) || mcq.infoItems.length < 3) {
        console.log(" MCQ-3: Invalid infoItems array")
        return false
      }

      const emptyInfoItems = mcq.infoItems.slice(0, 3).map((info: string, infoIndex: number) => {
        const isEmpty = !info || info.trim() === ""
        if (isEmpty) {
          console.log(` MCQ-3: Info item ${infoIndex + 1} is empty`)
        }
        return isEmpty
      })

      if (emptyInfoItems.some((isEmpty: boolean) => isEmpty)) {
        console.log(" MCQ-3: Some info items are empty")
        return false
      }
      console.log(" MCQ-3: All 3 info items have content")
    }

    console.log(` ${mcq.mcqType}: All validations passed`)
    return true
  }
}

// Function to check if entire template is complete
function checkTemplateIsComplete(mcqs: any[][]): boolean {
  console.log(" Checking template completion...")

  if (!mcqs || !Array.isArray(mcqs) || mcqs.length === 0) {
    console.log("❌ No MCQs found in template")
    return false
  }

  // Check each MCQ group
  const allGroupsValid = mcqs.every((group: any[], groupIndex: number) => {
    if (!Array.isArray(group) || group.length === 0) {
      console.log(` Group ${groupIndex + 1}: Empty group`)
      return false
    }

    // Check each MCQ in the group
    const allMCQsValid = group.every((mcq: any, mcqIndex: number) => {
      console.log(`\n Checking Group ${groupIndex + 1}, MCQ ${mcqIndex + 1}:`)
      const isValid = validateMCQ(mcq)
      if (!isValid) {
        console.log(` Group ${groupIndex + 1}, MCQ ${mcqIndex + 1}: INVALID`)
      } else {
        console.log(` Group ${groupIndex + 1}, MCQ ${mcqIndex + 1}: VALID`)
      }
      return isValid
    })

    if (!allMCQsValid) {
      console.log(` Group ${groupIndex + 1}: Contains invalid MCQs`)
      return false
    }

    console.log(` Group ${groupIndex + 1}: All MCQs valid`)
    return true
  })

  const isComplete = allGroupsValid
  console.log(`\n FINAL RESULT: Template completion status: ${isComplete ? " COMPLETE" : " INCOMPLETE"}`)

  return isComplete
}


function cleanMCQs(mcqs: any[][]): any[][] {
  return mcqs.map((group) =>
    group.map((mcq) => {
      if (mcq.mcqType === "mcq-4") {
        
        return {
          mcqType: mcq.mcqType,
          parentIdx: mcq.parentIdx,
          id: mcq.id,
          passage: mcq.passage || "",
          passageImage: mcq.passageImage || "",
          subQuestions: mcq.subQuestions || [],
          // Remove these fields for MCQ-4:
          // questionText, image, options, correctAnswer, marks
        }
      } else {
        
        const cleanedMCQ: any = {
          mcqType: mcq.mcqType,
          parentIdx: mcq.parentIdx,
          id: mcq.id,
          questionText: mcq.questionText || "",
          image: mcq.image || "",
          options: mcq.options || [],
          correctAnswer: mcq.correctAnswer || "",
          marks: mcq.marks || 1,
          //  Remove these fields for other MCQs:
          // passage, passageImage, subQuestions
        }

        // Add infoItems for MCQ-3
        if (mcq.mcqType === "mcq-3" && mcq.infoItems) {
          cleanedMCQ.infoItems = mcq.infoItems
        }

        return cleanedMCQ
      }
    }),
  )
}

//  Only POST route for creating MCQ templates
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let { user, primaryInfo, mcqs } = body

    if (!user || !primaryInfo || !mcqs) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Log the received data for debugging
    console.log("Received MCQ data:", JSON.stringify(mcqs, null, 2))

    //  Check template completion BEFORE cleaning
    const isComplete = checkTemplateIsComplete(mcqs)

    // Filter/clean mcqs
    mcqs = cleanMCQs(mcqs)

    // Log cleaned data
    console.log(" Cleaned MCQ data:", JSON.stringify(mcqs, null, 2))

    //  Create template with calculated isComplete
    const newTemplate = await MCQTemplate.create({
      user,
      primaryInfo,
      mcqs,
      isComplete, //  Set calculated value
    })

    console.log(" Successfully saved to MongoDB:", newTemplate._id)
    console.log(" Template isComplete status:", newTemplate.isComplete)

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newTemplate._id,
          isComplete: newTemplate.isComplete,
          totalMCQs: mcqs.length,
        },
        message: isComplete
          ? "Template completed and saved!"
          : "Template saved but incomplete. Please fill all required fields.",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error(" Error saving MCQ Template:", error.message)
    console.error("Full error:", error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 },
    )
  }
}
