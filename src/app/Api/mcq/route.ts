



// import { type NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/dbconfig/dbconfig"
// import MCQTemplate from "@/Models/mcqTemplate"

// await connectDB()

// function validateMCQ(mcq: any): boolean {
//   console.log(" Validating MCQ:", mcq.mcqType, mcq.id)

//   if (mcq.mcqType === "mcq-4") {
//     const hasPassageText = mcq.passage && mcq.passage.trim() !== ""
//     const hasPassageImage = mcq.passageImage && mcq.passageImage.trim() !== ""

//     if (!hasPassageText && !hasPassageImage) {
//       console.log(" MCQ-4: No passage text or image")
//       return false
//     }
//     console.log("MCQ-4: Has passage content")

//     if (!mcq.subQuestions || !Array.isArray(mcq.subQuestions) || mcq.subQuestions.length === 0) {
//       console.log(" MCQ-4: No sub-questions found")
//       return false
//     }
//     console.log(` MCQ-4: Has ${mcq.subQuestions.length} sub-questions`)

//     const allSubQuestionsValid = mcq.subQuestions.every((subQ: any, index: number) => {
//       console.log(`Validating Sub-Question ${index + 1}:`)

//       const hasSubText = subQ.questionText && subQ.questionText.trim() !== ""
//       const hasSubImage = subQ.image && subQ.image.trim() !== ""

//       if (!hasSubText && !hasSubImage) {
//         console.log(`MCQ-4 Sub ${index + 1}: No text or image`)
//         return false
//       }
//       console.log(`MCQ-4 Sub ${index + 1}: Has content (${hasSubText ? "text" : ""}${hasSubImage ? "image" : ""})`)

//       if (!subQ.options || !Array.isArray(subQ.options)) {
//         console.log(` MCQ-4 Sub ${index + 1}: No options array`)
//         return false
//       }

//       if (subQ.options.length < 4) {
//         console.log(` MCQ-4 Sub ${index + 1}: Less than 4 options (has ${subQ.options.length})`)
//         return false
//       }

//       const emptyOptions = subQ.options.map((opt: string, optIndex: number) => {
//         const isEmpty = !opt || opt.trim() === ""
//         if (isEmpty) {
//           console.log(` MCQ-4 Sub ${index + 1}: Option ${optIndex + 1} is empty`)
//         }
//         return isEmpty
//       })

//       if (emptyOptions.some((isEmpty: boolean) => isEmpty)) {
//         console.log(` MCQ-4 Sub ${index + 1}: Some options are empty`)
//         return false
//       }
//       console.log(` MCQ-4 Sub ${index + 1}: All 4 options have content`)

//       if (subQ.correctAnswer === "" || subQ.correctAnswer === null || subQ.correctAnswer === undefined) {
//         console.log(` MCQ-4 Sub ${index + 1}: No correct answer`)
//         return false
//       }

//       const answerIndex = Number.parseInt(subQ.correctAnswer)
//       if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= subQ.options.length) {
//         console.log(` MCQ-4 Sub ${index + 1}: Invalid correct answer index (${subQ.correctAnswer})`)
//         return false
//       }
//       console.log(` MCQ-4 Sub ${index + 1}: Valid correct answer (${answerIndex})`)

//       return true
//     })

//     if (!allSubQuestionsValid) {
//       return false
//     }

//     console.log(" MCQ-4: All validations passed")
//     return true
//   } else {
//     console.log(` Validating ${mcq.mcqType}:`)

//     const hasQuestionText = mcq.questionText && mcq.questionText.trim() !== ""
//     const hasQuestionImage = mcq.image && mcq.image.trim() !== ""

//     if (!hasQuestionText && !hasQuestionImage) {
//       console.log(` ${mcq.mcqType}: No question text or image`)
//       return false
//     }
//     console.log(
//       ` ${mcq.mcqType}: Has question content (${hasQuestionText ? "text" : ""}${hasQuestionImage ? "image" : ""})`,
//     )

//     if (!mcq.options || !Array.isArray(mcq.options)) {
//       console.log(` ${mcq.mcqType}: No options array`)
//       return false
//     }

//     const requiredOptions = mcq.mcqType === "mcq-2" ? 2 : 4
//     if (mcq.options.length < requiredOptions) {
//       console.log(` ${mcq.mcqType}: Less than ${requiredOptions} options (has ${mcq.options.length})`)
//       return false
//     }

//     const emptyOptions = mcq.options.slice(0, requiredOptions).map((opt: string, optIndex: number) => {
//       const isEmpty = !opt || opt.trim() === ""
//       if (isEmpty) {
//         console.log(` ${mcq.mcqType}: Option ${optIndex + 1} is empty`)
//       }
//       return isEmpty
//     })

//     if (emptyOptions.some((isEmpty: boolean) => isEmpty)) {
//       console.log(` ${mcq.mcqType}: Some options are empty`)
//       return false
//     }
//     console.log(` ${mcq.mcqType}: All ${requiredOptions} options have content`)

//     // STEP 3: Check correct answer
//     if (mcq.correctAnswer === "" || mcq.correctAnswer === null || mcq.correctAnswer === undefined) {
//       console.log(` ${mcq.mcqType}: No correct answer`)
//       return false
//     }

//     const answerIndex = Number.parseInt(mcq.correctAnswer)
//     if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= requiredOptions) {
//       console.log(` ${mcq.mcqType}: Invalid correct answer index (${mcq.correctAnswer})`)
//       return false
//     }
//     console.log(` ${mcq.mcqType}: Valid correct answer (${answerIndex})`)

//     // STEP 4: For MCQ-3, check infoItems
//     if (mcq.mcqType === "mcq-3") {
//       if (!mcq.infoItems || !Array.isArray(mcq.infoItems) || mcq.infoItems.length < 3) {
//         console.log(" MCQ-3: Invalid infoItems array")
//         return false
//       }

//       const emptyInfoItems = mcq.infoItems.slice(0, 3).map((info: string, infoIndex: number) => {
//         const isEmpty = !info || info.trim() === ""
//         if (isEmpty) {
//           console.log(` MCQ-3: Info item ${infoIndex + 1} is empty`)
//         }
//         return isEmpty
//       })

//       if (emptyInfoItems.some((isEmpty: boolean) => isEmpty)) {
//         console.log(" MCQ-3: Some info items are empty")
//         return false
//       }
//       console.log(" MCQ-3: All 3 info items have content")
//     }

//     console.log(` ${mcq.mcqType}: All validations passed`)
//     return true
//   }
// }

// // Function to check if entire template is complete
// function checkTemplateIsComplete(mcqs: any[][]): boolean {
//   console.log(" Checking template completion...")

//   if (!mcqs || !Array.isArray(mcqs) || mcqs.length === 0) {
//     console.log("❌ No MCQs found in template")
//     return false
//   }

//   // Check each MCQ group
//   const allGroupsValid = mcqs.every((group: any[], groupIndex: number) => {
//     if (!Array.isArray(group) || group.length === 0) {
//       console.log(` Group ${groupIndex + 1}: Empty group`)
//       return false
//     }

//     // Check each MCQ in the group
//     const allMCQsValid = group.every((mcq: any, mcqIndex: number) => {
//       console.log(`\n Checking Group ${groupIndex + 1}, MCQ ${mcqIndex + 1}:`)
//       const isValid = validateMCQ(mcq)
//       if (!isValid) {
//         console.log(` Group ${groupIndex + 1}, MCQ ${mcqIndex + 1}: INVALID`)
//       } else {
//         console.log(` Group ${groupIndex + 1}, MCQ ${mcqIndex + 1}: VALID`)
//       }
//       return isValid
//     })

//     if (!allMCQsValid) {
//       console.log(` Group ${groupIndex + 1}: Contains invalid MCQs`)
//       return false
//     }

//     console.log(` Group ${groupIndex + 1}: All MCQs valid`)
//     return true
//   })

//   const isComplete = allGroupsValid
//   console.log(`\n FINAL RESULT: Template completion status: ${isComplete ? " COMPLETE" : " INCOMPLETE"}`)

//   return isComplete
// }


// function cleanMCQs(mcqs: any[][]): any[][] {
//   return mcqs.map((group) =>
//     group.map((mcq) => {
//       if (mcq.mcqType === "mcq-4") {
        
//         return {
//           mcqType: mcq.mcqType,
//           parentIdx: mcq.parentIdx,
//           id: mcq.id,
//           passage: mcq.passage || "",
//           passageImage: mcq.passageImage || "",
//           subQuestions: mcq.subQuestions || [],
//           // Remove these fields for MCQ-4:
//           // questionText, image, options, correctAnswer, marks
//         }
//       } else {
        
//         const cleanedMCQ: any = {
//           mcqType: mcq.mcqType,
//           parentIdx: mcq.parentIdx,
//           id: mcq.id,
//           questionText: mcq.questionText || "",
//           image: mcq.image || "",
//           options: mcq.options || [],
//           correctAnswer: mcq.correctAnswer || "",
//           marks: mcq.marks || 1,
//           //  Remove these fields for other MCQs:
//           // passage, passageImage, subQuestions
//         }

//         // Add infoItems for MCQ-3
//         if (mcq.mcqType === "mcq-3" && mcq.infoItems) {
//           cleanedMCQ.infoItems = mcq.infoItems
//         }

//         return cleanedMCQ
//       }
//     }),
//   )
// }

// //  Only POST route for creating MCQ templates
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     let { user, primaryInfo, mcqs } = body

//     if (!user || !primaryInfo || !mcqs) {
//       return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
//     }

//     // Log the received data for debugging
//     console.log("Received MCQ data:", JSON.stringify(mcqs, null, 2))

//     //  Check template completion BEFORE cleaning
//     const isComplete = checkTemplateIsComplete(mcqs)

//     // Filter/clean mcqs
//     mcqs = cleanMCQs(mcqs)

//     // Log cleaned data
//     console.log(" Cleaned MCQ data:", JSON.stringify(mcqs, null, 2))

//     //  Create template with calculated isComplete
//     const newTemplate = await MCQTemplate.create({
//       user,
//       primaryInfo,
//       mcqs,
//       isComplete, //  Set calculated value
//     })

//     console.log(" Successfully saved to MongoDB:", newTemplate._id)
//     console.log(" Template isComplete status:", newTemplate.isComplete)

//     return NextResponse.json(
//       {
//         success: true,
//         data: {
//           id: newTemplate._id,
//           isComplete: newTemplate.isComplete,
//           totalMCQs: mcqs.length,
//         },
//         message: isComplete
//           ? "Template completed and saved!"
//           : "Template saved but incomplete. Please fill all required fields.",
//       },
//       { status: 201 },
//     )
//   } catch (error: any) {
//     console.error(" Error saving MCQ Template:", error.message)
//     console.error("Full error:", error)
//     return NextResponse.json(
//       { success: false, message: "Internal Server Error", error: error.message },
//       { status: 500 },
//     )
//   }
// }





import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/dbconfig/dbconfig"
import MCQTemplate from "@/Models/mcqTemplate"
import mongoose from "mongoose"

const validateMCQ = (mcq: any) => {
  console.log("🔍 Backend validating MCQ:", JSON.stringify(mcq, null, 2))

  // Check if mcq has required fields
  if (mcq.mcqType === "mcq-4") {
    // Passage-based MCQ
    const hasPassage = !!(mcq.passage?.trim() || mcq.passageImage?.trim())
    console.log("📝 Has passage:", hasPassage, { passage: mcq.passage, passageImage: mcq.passageImage })

    const hasSubQuestions = !!(mcq.subQuestions && mcq.subQuestions.length > 0)
    console.log("📋 Has subQuestions:", hasSubQuestions, "Count:", mcq.subQuestions?.length)

    if (!hasPassage || !hasSubQuestions) {
      console.log("❌ MCQ-4 failed basic checks")
      return false
    }

    // ✅ Enhanced subQuestion validation with detailed logging
    const allSubQuestionsValid = mcq.subQuestions.every((sq: any, index: number) => {
      const hasQuestionContent = !!(sq.questionText?.trim() || sq.image?.trim())
      const hasAllOptions = !!(
        sq.options &&
        Array.isArray(sq.options) &&
        sq.options.length === 4 &&
        sq.options.every((opt: string) => opt?.trim())
      )
      const hasCorrectAnswer = !!(
        sq.correctAnswer !== "" &&
        sq.correctAnswer !== null &&
        sq.correctAnswer !== undefined
      )

      console.log(`🔍 SubQuestion ${index + 1}:`, {
        hasQuestionContent,
        questionText: sq.questionText,
        image: sq.image,
        hasAllOptions,
        options: sq.options,
        hasCorrectAnswer,
        correctAnswer: sq.correctAnswer,
      })

      const isValid = hasQuestionContent && hasAllOptions && hasCorrectAnswer
      console.log(`✅ SubQuestion ${index + 1} valid:`, isValid)

      return isValid
    })

    console.log("🎯 All subQuestions valid:", allSubQuestionsValid)
    const finalResult = hasPassage && hasSubQuestions && allSubQuestionsValid
    console.log("🏁 Final MCQ-4 validation result:", finalResult)

    return finalResult
  } else {
    // Regular MCQ (mcq-1, mcq-2, mcq-3)
    const hasQuestion = !!(mcq.questionText?.trim() || mcq.image?.trim())
    const hasOptions = !!(mcq.options && Array.isArray(mcq.options) && mcq.options.every((opt: string) => opt?.trim()))
    const hasCorrectAnswer = !!(
      mcq.correctAnswer !== "" &&
      mcq.correctAnswer !== null &&
      mcq.correctAnswer !== undefined
    )

    console.log("🔍 Regular MCQ validation:", {
      mcqType: mcq.mcqType,
      hasQuestion,
      hasOptions,
      hasCorrectAnswer,
      questionText: mcq.questionText,
      image: mcq.image,
      options: mcq.options,
      correctAnswer: mcq.correctAnswer,
    })

    const result = hasQuestion && hasOptions && hasCorrectAnswer
    console.log("✅ Regular MCQ validation result:", result)

    return result
  }
}

// POST: Create new MCQ template (called when primary info is submitted)
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { user, primaryInfo, mcqs = [], isComplete = false, operation, templateId } = body

    console.log("📥 Received MCQ data:", JSON.stringify(body, null, 2))

    if (!user || !primaryInfo) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // ✅ Handle UPDATE operation
    if (operation === "update" && templateId) {
      if (!Array.isArray(mcqs)) {
        return NextResponse.json({ success: false, message: "MCQs must be an array for update" }, { status: 400 })
      }

      console.log("🔄 Updating MCQ template with", mcqs.length, "MCQs")

      const validatedMCQs = mcqs.map((mcq: any, index: number) => {
        console.log(`\n🔍 Validating MCQ ${index + 1}:`)
        const isValid = validateMCQ(mcq)

        const validatedMCQ = {
          ...mcq,
          id: mcq.id || `${Date.now()}-${index}`,
          parentIdx: index,
          isComplete: isValid,
        }

        console.log(`✅ MCQ ${index + 1} validation result:`, isValid)
        return validatedMCQ
      })

      const allMCQsComplete = validatedMCQs.length > 0 && validatedMCQs.every((mcq: any) => mcq.isComplete)
      console.log("🎯 All MCQs complete:", allMCQsComplete)
      console.log(
        "📊 MCQ completion status:",
        validatedMCQs.map((mcq, i) => `MCQ ${i + 1}: ${mcq.isComplete}`),
      )

      const updated = await MCQTemplate.findByIdAndUpdate(
        templateId,
        {
          user,
          primaryInfo,
          mcqs: validatedMCQs,
          isComplete: allMCQsComplete,
        },
        { new: true },
      )

      if (!updated) {
        return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 })
      }

      console.log("✅ MCQ Template updated:", updated._id, "isComplete:", allMCQsComplete)
      return NextResponse.json(
        {
          success: true,
          data: updated,
          message: allMCQsComplete
            ? "MCQ Template completed and saved successfully!"
            : "MCQ Template saved as draft. Complete all questions to finish.",
        },
        { status: 200 },
      )
    }

    // ✅ Handle CREATE operation (default)
    // Check if template already exists for this primaryInfo
    const existingTemplate = await MCQTemplate.findOne({
      user,
      primaryInfo,
    })

    if (existingTemplate) {
      return NextResponse.json(
        {
          success: false,
          message: "Template already exists for this primary info",
          templateId: existingTemplate._id,
        },
        { status: 409 },
      )
    }

    // Create new incomplete template
    const newTemplate = new MCQTemplate({
      user,
      primaryInfo,
      mcqs: [], // Empty initially
      isComplete: false, // Always incomplete when first created
    })

    const savedTemplate = await newTemplate.save()
    console.log("✅ Successfully created MCQ Template:", savedTemplate._id)

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: savedTemplate._id, // ✅ _id দিয়ে return করুন
          user: savedTemplate.user,
          primaryInfo: savedTemplate.primaryInfo,
          mcqs: savedTemplate.mcqs,
          isComplete: savedTemplate.isComplete,
          createdAt: savedTemplate.createdAt,
          updatedAt: savedTemplate.updatedAt,
        },
        message: "MCQ Template created successfully. Add questions to complete it.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Error creating MCQ template:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

// ✅ FIXED GET: Fetch existing MCQ template with better error handling
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 MCQ GET request started")

    // ✅ Connect to database first
    await connectDB()
    console.log("✅ Database connected")

    const { searchParams } = new URL(request.url)
    const templateId = searchParams.get("templateId")
    const user = searchParams.get("user")
    const primaryInfo = searchParams.get("primaryInfo")
    const userId = searchParams.get("userId")
    const onlyComplete = searchParams.get("onlyComplete")

    console.log("📥 GET parameters:", { templateId, user, primaryInfo, userId, onlyComplete })

    // ✅ Handle fetching complete templates for a user
    if (userId && onlyComplete === "true") {
      console.log("🔍 Fetching complete templates for user:", userId)

      const templates = await MCQTemplate.find({
        user: userId,
        isComplete: true,
        isDeleted: { $ne: true },
      })
        .populate("primaryInfo")
        .sort({ updatedAt: -1 })

      console.log("✅ Found", templates.length, "complete templates")
      return NextResponse.json({ success: true, data: templates }, { status: 200 })
    }

    if (!templateId && (!user || !primaryInfo)) {
      console.log("❌ Missing required parameters")
      return NextResponse.json({ success: false, message: "Missing templateId or user/primaryInfo" }, { status: 400 })
    }

    let template

    // ✅ Enhanced templateId validation and fetching
    if (templateId) {
      console.log("🔍 Fetching template by ID:", templateId)

      // ✅ Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(templateId)) {
        console.log("❌ Invalid ObjectId format:", templateId)
        return NextResponse.json({ success: false, message: "Invalid template ID format" }, { status: 400 })
      }

      try {
        // ✅ Try without populate first
        console.log("🔍 Finding template without populate...")
        template = await MCQTemplate.findById(templateId)

        if (!template) {
          console.log("❌ Template not found with ID:", templateId)
          return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 })
        }

        console.log("✅ Template found, now populating primaryInfo...")

        // ✅ Try to populate separately to catch populate errors
        try {
          template = await MCQTemplate.findById(templateId).populate("primaryInfo")
          console.log("✅ Template populated successfully")
        } catch (populateError) {
          console.log("⚠️ Populate failed, returning template without primaryInfo:", populateError)
          // Return template without populated primaryInfo if populate fails
          template = await MCQTemplate.findById(templateId)
        }
      } catch (findError) {
          const err = findError as Error

        return NextResponse.json(
          {
            success: false,
            message: "Error fetching template",
            error:err.message,
          },
          { status: 500 },
        )
      }
    } else {
      // Find by user + primaryInfo
      console.log("🔍 Fetching template by user and primaryInfo")

      try {
        template = await MCQTemplate.findOne({ user, primaryInfo })

        if (template) {
          try {
            template = await MCQTemplate.findOne({ user, primaryInfo }).populate("primaryInfo")
          } catch (populateError) {
            console.log("⚠️ Populate failed for user query:", populateError)
          }
        }
      } catch (findError) {
         const err = findError as Error
        return NextResponse.json(
          {
            success: false,
            message: "Error fetching template",
            error: err.message,
          },
          { status: 500 },
        )
      }
    }

    if (!template) {
      console.log("❌ Template not found")
      return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 })
    }

    console.log("✅ Successfully fetched MCQ Template:", template._id)
    console.log("📊 Template data:", {
      id: template._id,
      mcqsCount: template.mcqs?.length || 0,
      isComplete: template.isComplete,
      hasPrimaryInfo: !!template.primaryInfo,
    })

    return NextResponse.json(
      {
        success: true,
        data: template,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("❌ Unexpected error in MCQ GET:", error)
    console.error("❌ Error stack:", error.stack)

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
        details: "Check server logs for more information",
      },
      { status: 500 },
    )
  }
}

// DELETE: Remove a single MCQ from existing template
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const templateId = searchParams.get("templateId")
    const mcqIndex = searchParams.get("mcqIndex")

    if (!templateId || mcqIndex === null) {
      return NextResponse.json({ success: false, message: "Missing templateId or mcqIndex" }, { status: 400 })
    }

    const template = await MCQTemplate.findById(templateId)

    if (!template) {
      return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 })
    }

    const updatedMCQs = [...template.mcqs]
    updatedMCQs.splice(Number.parseInt(mcqIndex), 1)

    const validatedMCQs = updatedMCQs.map((mcq: any, index: number) => ({
      ...mcq,
      parentIdx: index,
      isComplete: validateMCQ(mcq),
    }))

    const allComplete = validatedMCQs.length > 0 && validatedMCQs.every((mcq) => mcq.isComplete)

    template.mcqs = validatedMCQs
    template.isComplete = allComplete

    await template.save()

    console.log("✅ MCQ deleted from template:", template._id)
    return NextResponse.json({ success: true, data: template }, { status: 200 })
  } catch (err) {
    console.error("❌ MCQ DELETE error:", err)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
