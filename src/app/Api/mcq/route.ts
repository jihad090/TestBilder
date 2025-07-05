

import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/dbconfig/dbconfig"
import MCQTemplate from "@/Models/mcqTemplate"

// Validate a single MCQ
function validateMCQ(mcq: any): boolean {
  if (mcq.mcqType === "mcq-4") {
    const hasPassageText = mcq.passage && mcq.passage.trim() !== ""
    const hasPassageImage = mcq.passageImage && mcq.passageImage.trim() !== ""
    if (!hasPassageText && !hasPassageImage) return false

    if (!mcq.subQuestions || !Array.isArray(mcq.subQuestions) || mcq.subQuestions.length === 0) return false

    const allSubQuestionsValid = mcq.subQuestions.every((subQ: any) => {
      const hasContent = (subQ.questionText && subQ.questionText.trim()) || (subQ.image && subQ.image.trim())
      if (!hasContent) return false
      if (!Array.isArray(subQ.options) || subQ.options.length < 4) return false
      if (subQ.options.some((opt: string) => !opt || opt.trim() === "")) return false
      const answerIndex = Number.parseInt(subQ.correctAnswer)
      return !isNaN(answerIndex) && answerIndex >= 0 && answerIndex < subQ.options.length
    })
    return allSubQuestionsValid
  } else {
    const hasContent = (mcq.questionText && mcq.questionText.trim()) || (mcq.image && mcq.image.trim())
    if (!hasContent) return false

    const requiredOptions = mcq.mcqType === "mcq-2" ? 2 : 4
    if (!Array.isArray(mcq.options) || mcq.options.length < requiredOptions) return false
    if (mcq.options.slice(0, requiredOptions).some((opt: string) => !opt || opt.trim() === "")) return false

    const answerIndex = Number.parseInt(mcq.correctAnswer)
    if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= requiredOptions) return false

    if (mcq.mcqType === "mcq-3") {
      if (!Array.isArray(mcq.infoItems) || mcq.infoItems.length < 3) return false
      if (mcq.infoItems.slice(0, 3).some((info: string) => !info || info.trim() === "")) return false
    }
    return true
  }
}

// Check if entire template is complete
function checkTemplateIsComplete(mcqs: any[]): boolean {
  if (!Array.isArray(mcqs) || mcqs.length === 0) return false
  return mcqs.every(validateMCQ)
}

// Convert frontend array structure to backend flat structure
function convertMCQsToBackendFormat(mcqs: any[][]): any[] {
  const flatMCQs: any[] = []

  mcqs.forEach((group, groupIndex) => {
    group.forEach((mcq) => {
      const cleanedMCQ: any = {
        mcqType: mcq.mcqType,
        parentIdx: groupIndex,
        questionText: mcq.questionText || "",
        image: mcq.image || "",
        options: mcq.options || [],
        correctAnswer: mcq.correctAnswer || "",
        marks: mcq.marks || 1,
      }

      if (mcq.mcqType === "mcq-3" && mcq.infoItems) {
        cleanedMCQ.infoItems = mcq.infoItems
      }

      if (mcq.mcqType === "mcq-4") {
        cleanedMCQ.passage = mcq.passage || ""
        cleanedMCQ.passageImage = mcq.passageImage || ""
        cleanedMCQ.subQuestions = (mcq.subQuestions || []).map((subQ: any, index: number) => ({
          childIdx: index,
          questionText: subQ.questionText || "",
          image: subQ.image || "",
          options: subQ.options || [],
          correctAnswer: subQ.correctAnswer || "",
          marks: subQ.marks || 1,
        }))
      }

      flatMCQs.push(cleanedMCQ)
    })
  })

  return flatMCQs
}

// Convert backend flat structure to frontend array structure
function convertMCQsToFrontendFormat(mcqs: any[]): any[][] {
  const groupedMCQs: { [key: number]: any[] } = {}

  mcqs.forEach((mcq) => {
    const parentIdx = mcq.parentIdx
    if (!groupedMCQs[parentIdx]) {
      groupedMCQs[parentIdx] = []
    }
    groupedMCQs[parentIdx].push(mcq)
  })

  // Convert to array format
  const result: any[][] = []
  Object.keys(groupedMCQs)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((key) => {
      result.push(groupedMCQs[Number(key)])
    })

  return result
}

export async function POST(req: NextRequest) {
  await connectDB()

  try {
    const body = await req.json()
    const { user, primaryInfo, mcqs } = body

    if (!user || !primaryInfo || !mcqs) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Convert frontend format to backend format
    const backendMCQs = convertMCQsToBackendFormat(mcqs)
    const isComplete = checkTemplateIsComplete(backendMCQs)

    const template = await MCQTemplate.findOne({ user, primaryInfo })

    if (template) {
      template.mcqs = backendMCQs
      template.isComplete = isComplete
      await template.save()

      return NextResponse.json(
        {
          success: true,
          message: "Template updated",
          data: {
            ...template.toObject(),
            mcqs: convertMCQsToFrontendFormat(template.mcqs),
          },
        },
        { status: 200 },
      )
    } else {
      const newTemplate = await MCQTemplate.create({
        user,
        primaryInfo,
        mcqs: backendMCQs,
        isComplete,
      })

      return NextResponse.json(
        {
          success: true,
          message: "Template created",
          data: {
            ...newTemplate.toObject(),
            mcqs: convertMCQsToFrontendFormat(newTemplate.mcqs),
          },
        },
        { status: 201 },
      )
    }
  } catch (error: any) {
    console.error("POST /api/mcq error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  await connectDB()

  try {
    const { searchParams } = new URL(req.url)
    const user = searchParams.get("user")
    const primaryInfo = searchParams.get("primaryInfo")

    if (!user || !primaryInfo) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing user or primaryInfo",
        },
        { status: 400 },
      )
    }

    const template = await MCQTemplate.findOne({ user, primaryInfo })

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: "Template not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...template.toObject(),
          mcqs: convertMCQsToFrontendFormat(template.mcqs),
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("GET /api/mcq error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

// Add a new PUT endpoint for individual MCQ updates and fix DELETE
export async function PUT(req: NextRequest) {
  await connectDB()

  try {
    const body = await req.json()
    const { user, primaryInfo, mcqId, updatedMCQ } = body

    if (!user || !primaryInfo || !mcqId || !updatedMCQ) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const template = await MCQTemplate.findOne({ user, primaryInfo })
    if (!template) {
      return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 })
    }

    // Find and update the specific MCQ
    const mcqIndex = template.mcqs.findIndex((mcq: any) => mcq._id.toString() === mcqId)
    if (mcqIndex === -1) {
      return NextResponse.json({ success: false, message: "MCQ not found" }, { status: 404 })
    }

    template.mcqs[mcqIndex] = { ...template.mcqs[mcqIndex], ...updatedMCQ }
    template.isComplete = checkTemplateIsComplete(template.mcqs)
    await template.save()

    return NextResponse.json(
      {
        success: true,
        message: "MCQ updated",
        data: {
          ...template.toObject(),
          mcqs: convertMCQsToFrontendFormat(template.mcqs),
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("PUT /api/mcq error:", error)
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 })
  }
}

// Fix DELETE to work with both group and individual MCQ deletion
export async function DELETE(req: NextRequest) {
  await connectDB()

  try {
    const body = await req.json()
    const { user, primaryInfo, mcqId, deleteType = "single" } = body

    if (!user || !primaryInfo || !mcqId) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const template = await MCQTemplate.findOne({ user, primaryInfo })
    if (!template) {
      return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 })
    }

    if (deleteType === "group") {
      // Delete entire group by parentIdx
      const parentIdx = Number.parseInt(mcqId)
      const initialLength = template.mcqs.length
      template.mcqs = template.mcqs.filter((mcq: any) => mcq.parentIdx !== parentIdx)

      if (template.mcqs.length === initialLength) {
        return NextResponse.json({ success: false, message: "MCQ group not found" }, { status: 404 })
      }

      // Re-index remaining groups
      const groupMap = new Map()
      template.mcqs.forEach((mcq: any) => {
        if (!groupMap.has(mcq.parentIdx)) {
          groupMap.set(mcq.parentIdx, groupMap.size)
        }
        mcq.parentIdx = groupMap.get(mcq.parentIdx)
      })
    } else {
      // Delete individual MCQ
      const initialLength = template.mcqs.length
      template.mcqs = template.mcqs.filter((mcq: any) => mcq._id.toString() !== mcqId)

      if (template.mcqs.length === initialLength) {
        return NextResponse.json({ success: false, message: "MCQ not found" }, { status: 404 })
      }
    }

    template.isComplete = checkTemplateIsComplete(template.mcqs)
    await template.save()

    return NextResponse.json(
      {
        success: true,
        message: "MCQ deleted",
        data: {
          ...template.toObject(),
          mcqs: convertMCQsToFrontendFormat(template.mcqs),
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("DELETE /api/mcq error:", error)
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 })
  }
}
