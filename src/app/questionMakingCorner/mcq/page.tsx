"use client";
import React from "react";
import { Label } from "@/ui/label"; // Adjusted path
import { Input } from "@/ui/input"; // Adjusted path
import { cn } from "@/lib/utils"; // Adjusted path
import { div } from "motion/react-client";
import Link from "next/link";
import MCQTemplet_1 from "@/components/ui/mcqTemplet";
import { MCQ } from "@/components/mcq";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mcq = () => {
  const [mcqTemplet, setMcqTemplet] = React.useState<any>([]);
  return (
    <div id="test" className=' my-15 p-4 max-w-220 justify-center'>
      <div className=" justify-between fixed w-full top-[100px] z-10">
        <div className=" justify-between flex bg-gray-100 p-2 rounded-2xl max-w-200 m-auto">
          <div>
            <Select>
              <SelectTrigger className=" min-w-[380px] bg-white">
                <SelectValue placeholder="Select MCQ type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq-1">সাধারণ বহুনির্বাচনী (Standard Multiple Choice Question) </SelectItem>
                <SelectItem value="mcq-2">সত্য/মিথ্যা (True/False) </SelectItem>
                <SelectItem value="mcq-3">বহুপদী ও সমাপ্তিসূচক (Multiple Completion Based Question) </SelectItem>
                <SelectItem value="mcq-4">অভিন্ন তথ্যভিত্তিক (Situation Set Based Question)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black">Add</button>
          </div>
        </div>
      </div>
      {/* <button onClick={()=>{
        setMcqTemplet((mcqTemplet:any) => [...mcqTemplet, { call: () => <MCQTemplet_1 /> }]);
      }}>
        Add Question
      </button> */}
      <>
        {
          mcqTemplet.map((item:any, index:number) => (
            <div key={index} className="mb-4">
              {item.call()}
            </div>
          ))
        }
      </>
      <div className="justify-center flex text-white">
        <button className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white">Generate PDF</button>
      </div>
    </div>
  )
}


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

export default mcq