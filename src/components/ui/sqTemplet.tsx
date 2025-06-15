import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import ImageDropzone from "@/components/ImageDropzone";

type DelBtnProps = {
  pIdx: number;
  onDelete: () => void;
};

export const DelBtnSQ = ({ onDelete }: DelBtnProps) => (
  <button
    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 text-sm rounded-xl"
    onClick={onDelete}
  >
    Delete CQ
  </button>
);

export const SqTemplet = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-2xl p-3 bg-blue-100 rounded-2xl">
      <div className="flex justify-between">
        <div className="w-full">
          <Label>প্রশ্ন (Question)</Label>
          <Input
            placeholder={`প্রশ্ন লিখুন (Write question )`}
            type="text"
            className="w-full"
          /> 
        </div>      
        <div>
          <Label>নম্বর (Marks)</Label>
          <Input
            placeholder="নম্বর"
            type="number"
            className="w-20"
            defaultValue={1}
          />
        </div>        
      </div>
      <ImageDropzone imgFor="" />                
      <div className="flex space-x-2">{children}</div>
    </div>
  );
};
