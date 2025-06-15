"use client";
import React, { use, useState } from "react";
import { Label } from "@/ui/label"; // Adjusted path
import { Input } from "@/ui/input"; // Adjusted path
import { cn } from "@/lib/utils"; // Adjusted path
import Link from "next/link";
import { DelBtn, MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4 } from "@/components/ui/mcqTemplet";
import { MCQ } from "@/components/mcq";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select"
let mcqTempIdx = 0;
const mcq = () => {
  const [mcqTemplet, setMcqTemplet] = React.useState<any>([]);
  const [mcqTempletName, setMcqTempletName] = useState<string | undefined>("mcq-1");
  
  // React.useEffect(() => {
  //   console.log("mcqTemplet updated:", mcqTemplet);
  // }, [mcqTemplet]);

  return (
    <div id="test" className=' my-15 w-full'>
      <div className=" justify-between items-center w-full fixed top-[100px] z-10">
        <div className=" justify-between item-center w-full flex bg-gray-400 p-2 rounded-2xl max-w-200 m-auto">
          <div className="flex items-center text-md font-semibold">
            <div className="w-22">MCQ Type: </div>
            <Select defaultValue={"mcq-1"} value={mcqTempletName} onValueChange={(value: string) => {
              setMcqTempletName(value);
              // console.log(value);
            }}>
              <SelectTrigger className=" min-w-[380px] bg-white">
                <SelectValue placeholder="Select MCQ type" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="mcq-1">সাধারণ বহুনির্বাচনী (Standard Multiple Choice Question) </SelectItem>
                <SelectItem value="mcq-2">সত্য/মিথ্যা (True/False) </SelectItem>
                <SelectItem value="mcq-3">বহুপদী ও সমাপ্তিসূচক (Multiple Completion Based Question) </SelectItem>
                <SelectItem value="mcq-4">অভিন্ন তথ্যভিত্তিক (Situation Set Based Question)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black"
              onClick={() => {
                setMcqTemplet((prev: any) => [...prev, [ { mcqType: mcqTempletName, parentIdx: mcqTempIdx, childIdx:0 }]])
                mcqTempIdx++
              }}>Add</button>
            {/* <MCQTemplet_1 className=""/> */}
          </div>
        </div>
      </div>
      {
        // mcqTemplet.map((item: any, idx1: number) => item.map((i:any, idx2: number)=>{

        mcqTemplet.map((item: any, idx1: number)=>{
          if ( item[0]?.mcqType === "mcq-1"){ return <MCQTemplet_1 key={item[0].parentIdx}><DelBtn pIdx={item[0].parentIdx} cIdx={item[0].childIdx} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet}/> </MCQTemplet_1>}
          if ( item[0]?.mcqType === "mcq-2"){ return <MCQTemplet_2 key={item[0].parentIdx}><DelBtn pIdx={item[0].parentIdx} cIdx={item[0].childIdx} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet}/> </MCQTemplet_2>}
          if ( item[0]?.mcqType === "mcq-3"){ return <MCQTemplet_3 key={item[0].parentIdx}><DelBtn pIdx={item[0].parentIdx} cIdx={item[0].childIdx} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet}/> </MCQTemplet_3>}
          if ( item[0]?.mcqType === "mcq-4"){ return <MCQTemplet_4 pIdx={item[0].parentIdx} cIdx={item[0].childIdx} setMcqTemplet={setMcqTemplet} key={item[0].parentIdx} mcqTemplet={mcqTemplet}><DelBtn pIdx={item[0].parentIdx} cIdx={item[0].childIdx} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet}/> </MCQTemplet_4>}
          console.log(mcqTemplet) 
        })
      }
      <div className="justify-center flex text-white">
        <button className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white">Generate PDF</button>
      </div>
    </div>
  )
}

export default mcq