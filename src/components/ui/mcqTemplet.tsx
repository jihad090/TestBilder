import React from 'react'
import { Label } from "../../ui/label"; // Adjusted path
import { Input } from "../../ui/input"; // Adjusted path
import { cn } from "../../lib/utils"; // Adjusted path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MCQTemplet_1 = () => {
  return (
    <form className="bg-blue-100 p-3 rounded-2xl mb-2" >
      <LabelInputContainer className="mb-2">
        <Label htmlFor="qStatement">প্রশ্ন (Question)</Label>
        <Input id="qStatement" placeholder="প্রশ্নটি লিখুন (Write the question)" type="text" />
      </LabelInputContainer>
      <div>
        <div className="flex ">
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op1">ক/ Option A</Label>
            <Input id="op1" placeholder="ক/A" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op2">খ/ Option B</Label>
            <Input id="op2" placeholder="খ/B" type="text" />
          </LabelInputContainer>     
        </div>
        <div className="flex ">
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op3">গ/Option C</Label>
            <Input id="op3" placeholder="গ/C" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op4">ঘ/ Option D</Label>
            <Input id="op4" placeholder="ঘ/D" type="text" />
          </LabelInputContainer>     
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-black text-white font-semibold px-3 text-sm rounded-xl"> Delete </button>
        <button className="bg-black text-white font-semibold px-3 text-sm rounded-xl"> Copy </button>
      </div>
    </form>
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

export default MCQTemplet_1;