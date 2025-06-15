import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import PrimaryQuestionInfo from "@/Models/primaryQuestion";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      user,  
      version,
      institutionName,
      class: className,
      totalMark,
      examName,
      subject,
      paper = "none",
      subjectCode,
      examType,
      totalTime,
      totalSet = 1,
      examDate,
    } = body;

    const newQuestion = await PrimaryQuestionInfo.create({
      user,
      version,
      institutionName,
      class: className,
      totalMark,
      examName,
      subject,
      paper,
      subjectCode,
      examType,
      totalTime,
      totalSet,
      examDate,
    });

    return NextResponse.json({ success: true, data: newQuestion }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
