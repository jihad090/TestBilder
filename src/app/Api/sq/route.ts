import { NextRequest, NextResponse } from "next/server";
import ShortQuestion from "@/Models/sqTemplete";
import { connectDB } from "@/dbconfig/dbconfig"; 

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { user, primaryInfo, sqGroup } = body;

    if (!user || !primaryInfo || !sqGroup) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Check if all questionText fields are non-empty strings
    const isComplete = sqGroup.questions.every(
      (q: { questionText?: string }) => typeof q.questionText === "string" && q.questionText.trim() !== ""
    );

   
    const newShortQuestion = new ShortQuestion({
      user,
      primaryInfo,
      sqGroup: {
        ...sqGroup,
        isComplete,
      },
    });

    await newShortQuestion.save();

    return NextResponse.json({ success: true, data: newShortQuestion });
  } catch (error) {
    console.error("Error saving short question:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
