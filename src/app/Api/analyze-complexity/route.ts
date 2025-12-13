
import { type NextRequest, NextResponse } from "next/server"
import { analyzeComplexity } from "@/utils/complexityAnalyzer"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { text } = body

        if (!text) {
            return NextResponse.json(
                { success: false, message: "Text is required" },
                { status: 400 }
            )
        }

        const complexity = await analyzeComplexity(text)

        return NextResponse.json(
            { success: true, complexity },
            { status: 200 }
        )
    } catch (error: any) {
        console.error("Analyze API error:", error)
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        )
    }
}
