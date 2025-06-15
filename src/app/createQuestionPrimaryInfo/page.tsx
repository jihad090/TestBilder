
"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";

export default function QuestionFormDemo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Load userId from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      console.log("userId from localStorage:", storedUserId);
      setUserId(storedUserId);
      if (!storedUserId) {
        setErrorMsg("User not logged in! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!userId) {
      setErrorMsg("User not logged in! Please log in first.");
      return;
    }

    setLoading(true);

    const formData = {
      user: userId,
      version: (document.getElementById("version") as HTMLSelectElement).value,
      institutionName: (document.getElementById("institutionName") as HTMLInputElement).value,
      class: (document.getElementById("class") as HTMLInputElement).value,
      totalMark: Number((document.getElementById("totalMark") as HTMLInputElement).value),
      examName: (document.getElementById("examName") as HTMLInputElement).value,
      subject: (document.getElementById("subject") as HTMLInputElement).value,
      paper: (document.getElementById("paper") as HTMLSelectElement).value,
      subjectCode: Number((document.getElementById("subjectCode") as HTMLInputElement).value),
      examType: (document.getElementById("examType") as HTMLSelectElement).value,
      totalTime: (document.getElementById("totalTime") as HTMLInputElement).value,
      totalSet: Number((document.getElementById("totalSet") as HTMLInputElement).value),
      examDate: (document.getElementById("examDate") as HTMLInputElement).value,
    };

    // Form validation
    if (!formData.version || formData.version === "none") {
      setErrorMsg("Please select a version");
      setLoading(false);
      return;
    }
    if (!formData.institutionName) {
      setErrorMsg("Institution name is required");
      setLoading(false);
      return;
    }
    if (!formData.class) {
      setErrorMsg("Class is required");
      setLoading(false);
      return;
    }
    if (!formData.examName) {
      setErrorMsg("Exam name is required");
      setLoading(false);
      return;
    }
    if (!formData.subject) {
      setErrorMsg("Subject is required");
      setLoading(false);
      return;
    }
    if (!formData.examType || formData.examType === "none") {
      setErrorMsg("Please select an exam type");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/Api/createQuestionPrimaryInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("API response:", result);

      if (result.success) {
        alert("Primary Question Created Successfully!");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          router.push("/questionMakingCorner/mcq");
        }, 1000);
      } else {
        setErrorMsg(result.message || "Failed to create question");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-input my-16 mx-auto max-w-md rounded-none bg-gray-100 p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Complete These Primary Questions
      </h2>
      {errorMsg && (
        <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="version">Version</Label>
          <select id="version" className="bg-white h-10 rounded-sm">
            <option value="none" hidden>
              Select version
            </option>
            <option value="english">English</option>
            <option value="bangla">বাংলা</option>
          </select>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="institutionName">Institution Name</Label>
          <Input id="institutionName" placeholder="Your Institution Name" type="text" />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="class">Class</Label>
            <Input id="class" placeholder="class" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="totalMark">Total Mark</Label>
            <Input id="totalMark" placeholder="Total Mark" min={1} max={1000} type="number" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="examName">Exam Name</Label>
          <Input id="examName" placeholder="Exam Name" type="text" />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Subject" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="paper">Paper</Label>
            <select id="paper" className="bg-white rounded-sm h-10 px-2">
              <option value="none" hidden>
                If need
              </option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
            </select>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="subjectCode">Subject Code</Label>
            <Input id="subjectCode" placeholder="If need" min={1} max={200} type="number" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="examType">Exam Type</Label>
          <select id="examType" className="bg-white h-10 rounded-sm">
            <option value="none" hidden>
              Select Exam
            </option>
            <option value="mcq">Multiple Choice Question (MCQ) / বহুনির্বাচনী প্রশ্ন</option>
            <option value="cq">Creative Question (CQ) / সৃজনশীল প্রশ্ন</option>
            <option value="sq">Short Question (SQ) / সংক্ষীপ্ত প্রশ্ন</option>
            <option value="cq_and_sq">CQ And SQ / সৃজনশীল ও সংক্ষীপ্ত প্রশ্ন</option>
          </select>
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="totalTime">Total Time</Label>
            <Input id="totalTime" placeholder="Total Time" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="totalSet">Total Set</Label>
            <Input id="totalSet" defaultValue="1" placeholder="Total Set" min={1} max={5} type="number" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="examDate">Exam Date</Label>
            <Input id="examDate" placeholder="Exam Date" type="date" />
          </LabelInputContainer>
        </div>

        <button
          type="submit"
          disabled={loading || !userId}
          className="block h-10 w-full rounded-md bg-black font-medium text-white text-center p-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Get Template →"}
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};