"use client";
import React, { useState } from "react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DelBtn, MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4 } from "@/components/ui/mcqTemplet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mcq = () => {
  const [mcqTemplet, setMcqTemplet] = useState<any[]>([]);
  const [mcqTempletName, setMcqTempletName] = useState<string>("mcq-1");

  // Helper function to generate unique ID
  const generateId = () => Date.now() + Math.random();

  // Add new MCQ group
  const handleAddMcqGroup = () => {
    const newGroup = [{
      mcqType: mcqTempletName,
      parentIdx: mcqTemplet.length,
      childIdx: 0,
      id: generateId()
    }];
    
    setMcqTemplet(prev => [...prev, newGroup]);
  };

  // Render MCQ component based on type
  const renderMcqComponent = (item: any, arrayIndex: number) => {
    const keyValue = item[0].id || arrayIndex;
    console.log(mcqTemplet)
    const deleteBtn = (
      <DelBtn 
        pIdx={arrayIndex} 
        cIdx={item[0].childIdx} 
        setMcqTemplet={setMcqTemplet} 
        mcqTemplet={mcqTemplet}
      />
    );

    switch (item[0]?.mcqType) {
      case "mcq-1":
        return (
          <MCQTemplet_1 key={keyValue}>
            {deleteBtn}
          </MCQTemplet_1>
        );
      case "mcq-2":
        return (
          <MCQTemplet_2 key={keyValue}>
            {deleteBtn}
          </MCQTemplet_2>
        );
      case "mcq-3":
        return (
          <MCQTemplet_3 key={keyValue}>
            {deleteBtn}
          </MCQTemplet_3>
        );
      case "mcq-4":
        return (
          <MCQTemplet_4 
            key={keyValue}
            pIdx={arrayIndex}
            cIdx={item[0].childIdx}
            setMcqTemplet={setMcqTemplet}
            mcqTemplet={mcqTemplet}
          >
            {deleteBtn}
          </MCQTemplet_4>
        );
      default:
        return null;
    }
  };

  return (
    <div id="test" className='my-15 w-full'>
      <div className="justify-between items-center w-full fixed top-[100px] z-10">
        <div className="justify-between item-center w-full flex bg-gray-400 p-2 rounded-2xl max-w-200 m-auto">
          <div className="flex items-center text-md font-semibold">
            <div className="w-22">MCQ Type: </div>
            <Select 
              defaultValue="mcq-1" 
              value={mcqTempletName} 
              onValueChange={setMcqTempletName}
            >
              <SelectTrigger className="min-w-[380px] bg-white">
                <SelectValue placeholder="Select MCQ type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq-1">সাধারণ বহুনির্বাচনী (Standard Multiple Choice Question)</SelectItem>
                <SelectItem value="mcq-2">সত্য/মিথ্যা (True/False)</SelectItem>
                <SelectItem value="mcq-3">বহুপদী ও সমাপ্তিসূচক (Multiple Completion Based Question)</SelectItem>
                <SelectItem value="mcq-4">অভিন্ন তথ্যভিত্তিক (Situation Set Based Question)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button 
              className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black"
              onClick={handleAddMcqGroup}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {mcqTemplet.map((item, arrayIndex) => renderMcqComponent(item, arrayIndex))}

      <div className="justify-center flex text-white">
        <button className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default mcq;