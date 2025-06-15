"use client";
import React, { useState } from "react";
import { SqTemplet, DelBtnSQ } from "@/components/ui/sqTemplet";

const Page = () => {
  const [sqTemplet, setSqTemplet] = useState<{ id: number; parentIdx: number }[]>([]);
  const [sqTempletName, setSqTempletName] = useState<string>("cq-1");

  const generateId = () => Date.now() + Math.random();

  const handleAddCQGroup = () => {
    const newCQ = {
      parentIdx: sqTemplet.length,
      id: generateId()
    };
    setSqTemplet(prev => [...prev, newCQ]);
  };

  const handleDeleteGroup = (idx: number) => {
    setSqTemplet(prev => prev.filter((_, i) => i !== idx)); // ✅ Immutable delete :contentReference[oaicite:1]{index=1}
  };

  const renderSQComponent = (item: any, arrayIndex: number) => {
    const keyValue = item.id;
    return (
      <SqTemplet key={keyValue}>
        <DelBtnSQ pIdx={arrayIndex} onDelete={() => handleDeleteGroup(arrayIndex)} />
      </SqTemplet>
    );
  };

  return (
    <div id="test" className="my-15 w-full">
      <div className="fixed top-[100px] z-10 w-full flex justify-center">
        <div className="flex justify-between items-center max-w-2xl w-full bg-gray-400 p-2 rounded-2xl">
          <span className="font-semibold">Add a new Short Question</span>
          <button
            className="px-6 py-1 bg-black text-white rounded-xl hover:bg-blue-700"
            onClick={handleAddCQGroup}
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-[50px] space-y-4">
        {sqTemplet.map(renderSQComponent)}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-3 py-1 bg-black text-white rounded-md hover:bg-blue-700 font-semibold">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Page;
