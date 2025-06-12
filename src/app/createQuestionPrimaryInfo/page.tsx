"use client";
import React from "react";
import { Label } from "../../ui/label"; // Adjusted path
import { Input } from "../../ui/input"; // Adjusted path
import { cn } from "../../lib/utils"; // Adjusted path
import { div } from "motion/react-client";
import Link from "next/link";

export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className=" shadow-input my-16 mx-auto max-w-md rounded-none bg-gray-100 p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Complete These primary Questions
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="version">Version</Label>
          <select id="version" className="bg-white h-10 rounded-sm">
            <option value="none" hidden >Select version</option>
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
          <Label htmlFor="email">Exam Name</Label>
          <Input id="examName" placeholder="Exam Name" type="text" />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Subject" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
          <Label htmlFor="paper">Paper</Label>
            <select id="paper" className="bg-white rounded-sm h-10 px-2" >
              <option value="none" hidden >If need</option>
              <option value="1st" >1st</option>
              <option value="2nd" >2nd</option>
              <option value="3rd" >3rd</option>
              <option value="4th" >4th</option>
              <option value="5th" >5th</option>
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
            <option value="none" hidden >Select Exam</option>
            <option value="mcq">Multiple Choice Question (MCQ) / বহুনির্বাচনী প্রশ্ন</option>
            <option value="cq">Creative Question (CQ) / সৃজনশীল প্রশ্ন</option>
            <option value="sq">Short Question (SQ) / সংক্ষীপ্ত প্রশ্ন</option>
            <option value="cq">CQ And SQ / সৃজনশীল ও সংক্ষীপ্ত প্রশ্ন </option>
            {/* <option value="cq">CQ And MCQ / সৃজনশীল ও বহুনীর্বাচনী (No OMR)</option> */}
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
        
        <Link href="/questionMakingCorner/mcq"
          className="block h-10 w-full rounded-md bg-black font-medium text-white text-center p-2 hover:bg-blue-700 "
          type="submit"
        >
          Get Templet &rarr;
        </Link>
      </form>
    </div>      
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
