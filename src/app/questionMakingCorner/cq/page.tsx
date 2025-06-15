"use client";
import React, { useState } from "react";
import { CqTemplet_1, CqTemplet_2, DelBtnCQ, } from "@/components/ui/cqTemplet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const cq = () => {
  const [cqTemplet, setCqTemplet] = useState<any[]>([]);
  const [cqTempletName, setCqTempletName] = useState<string>("cq-1");

  // Helper function to generate unique ID
  const generateId = () => Date.now() + Math.random();

  // Add new CQ item (single object, not nested array)
  const handleAddCQGroup = () => {
    const newCQ = {
      cqType: cqTempletName,
      parentIdx: cqTemplet.length,
      containedQuestion: cqTempletName === "cq-1" ? 4 : 3,
      id: generateId()
    };
    
    setCqTemplet(prev => [...prev, newCQ]);
  };

  // Render CQ component based on type
  const renderCQComponent = (item: any, arrayIndex: number) => {
    const keyValue = item.id || arrayIndex;
    console.log(cqTemplet);
    
    const deleteBtn = (
      <DelBtnCQ
        pIdx={arrayIndex} 
        setCqTemplet={setCqTemplet} 
        cqTemplet={cqTemplet}
      />
    );

    switch (item.cqType) { // Changed from mcqType to cqType
      case "cq-1":
        return (
          <CqTemplet_1 key={keyValue}>
            {deleteBtn}
          </CqTemplet_1>
        );
      case "cq-2":
        return (
          <CqTemplet_2 key={keyValue}>
            {deleteBtn}
          </CqTemplet_2>
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
            <div className="w-22">CQ Type: </div> {/* Changed from MCQ to CQ */}
            <Select 
              defaultValue="cq-1" 
              value={cqTempletName} 
              onValueChange={setCqTempletName}
            >
              <SelectTrigger className="min-w-[380px] bg-white">
                <SelectValue placeholder="Select CQ type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cq-1">Including 4 questions</SelectItem>
                <SelectItem value="cq-2">Including 3 questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button 
              className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black"
              onClick={handleAddCQGroup}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {cqTemplet.map((item, arrayIndex) => renderCQComponent(item, arrayIndex))}

      <div className="justify-center flex text-white">
        <button className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default cq;