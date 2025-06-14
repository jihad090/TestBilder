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
import ImageDropzone from '@/components/ImageDropzone'
import { remove } from 'dexie';
import { div } from 'motion/react-client';
type Props = {
  css?: string;
  mcqTempIdx?: string;
  mcqTemplet: any
  index?: string;
  pIdx: number;
  cIdx: number;
  setMcqTemplet: React.Dispatch<React.SetStateAction<any[]>>;
};
const MCQTemplet_1 = ({ children }: { children: React.ReactNode }) => {
  // console.log("state:", mcqTemplet, mcqTempIdx)
  return (
    <div className='w-full'>
      <form className="bg-blue-300 mx-auto max-w-220 p-3 rounded-2xl mb-2 ">
        <LabelInputContainer className="mb-2">
          <Label htmlFor="qStatement">প্রশ্ন (Question)</Label>
          <Input id="qStatement" placeholder="প্রশ্নটি লিখুন (Write the question)" type="text" />
        </LabelInputContainer>
        <ImageDropzone imgFor={"Question"} />
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
          {
            children
          }
          <div>
            <Select>
              <SelectTrigger className="min-w-[250px] bg-white">
                <SelectValue placeholder="সঠিক উত্তর (Correct Answer)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">ক/A</SelectItem>
                <SelectItem value="1">খ/B</SelectItem>
                <SelectItem value="2">গ/C</SelectItem>
                <SelectItem value="3">ঘ/D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>

  );
};
const MCQTemplet_2 = ({ children }: { children: React.ReactNode }) => {
  // console.log("state:", mcqTemplet, mcqTempIdx)
  return (
    <div className='w-full'>
      <form className="bg-blue-300 mx-auto max-w-220 p-3 rounded-2xl mb-2 ">
        <LabelInputContainer className="mb-2">
          <Label htmlFor="qStatement">প্রশ্ন (Question)</Label>
          <Input id="qStatement" placeholder="প্রশ্নটি লিখুন (Write the question)" type="text" />
        </LabelInputContainer>
        <ImageDropzone imgFor={"Question"} />
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

        </div>
        <div className="flex justify-between">
          {
            children
          }
          <div>
            <Select>
              <SelectTrigger className="min-w-[250px] bg-white">
                <SelectValue placeholder="সঠিক উত্তর (Correct Answer)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">ক/A</SelectItem>
                <SelectItem value="1">খ/B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>

  );
};
const MCQTemplet_3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <form className="bg-blue-300 mx-auto max-w-220 p-3 rounded-2xl mb-2 " >
      <LabelInputContainer className="mb-2">
        <Label htmlFor="qStatement">প্রশ্ন (Question)</Label>
        <Input id="qStatement" placeholder="প্রশ্নটি লিখুন (Write the question)" type="text" />
      </LabelInputContainer>
      <ImageDropzone imgFor={"Question"} />
      <div className='mx-10'>
        <label htmlFor="info1">i. </label><input id='info1' type="text" placeholder='info 1' className='bg-white p-1 w-[400px] rounded-md mb-2' />   <br />
        <label htmlFor="info1">ii. </label><input id='info1' type="text" placeholder='info 1' className='bg-white p-1 w-[395px] rounded-md mb-2' />  <br />
        <label htmlFor="info1">iii. </label><input id='info1' type="text" placeholder='info 1' className='bg-white p-1 w-[392px] rounded-md mb-2' />
      </div>

      <div>
        <div className="flex ">
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op1">ক/ Option A</Label>
            <Input defaultValue={"i, ii"} id="op1" placeholder="ক/A" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op2">খ/ Option B</Label>
            <Input defaultValue={"i, iii"} id="op2" placeholder="খ/B" type="text" />
          </LabelInputContainer>
        </div>
        <div className="flex ">
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op3">গ/Option C</Label>
            <Input defaultValue={"ii, iii"} id="op3" placeholder="গ/C" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="op4">ঘ/ Option D</Label>
            <Input defaultValue={"i, ii, iii"} id="op4" placeholder="ঘ/D" type="text" />
          </LabelInputContainer>
        </div>
      </div>
      <div className="flex justify-between">
        {
          children
        }
        <div>
          <Select>
            <SelectTrigger className="min-w-[250px] bg-white">
              <SelectValue placeholder="সঠিক উত্তর (Correct Answer)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">ক/A</SelectItem>
              <SelectItem value="1">খ/B</SelectItem>
              <SelectItem value="2">গ/C</SelectItem>
              <SelectItem value="3">ঘ/D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  )
}
type MCQTempletProps = {
  children?: React.ReactNode;
  pIdx: number;
  cIdx: number;
  mcqTemplet: any;
  setMcqTemplet: any;
};
const MCQTemplet_4 = ({ children, cIdx, pIdx, setMcqTemplet, mcqTemplet }: MCQTempletProps) => {
  const handleAddMcq = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (mcqTemplet[pIdx].length >= 3) return; // Max 3 MCQs
    
    setMcqTemplet((prev:any) => {
      return prev.map((group: any, index: any) => {
        if (index === pIdx) {
          const lastChild = group[group.length - 1];
          const newChildIdx = lastChild ? lastChild.childIdx + 1 : 0;
          const newItem = {
            mcqType: "mcq-4",
            parentIdx: pIdx,
            childIdx: newChildIdx,
            id: Date.now() + Math.random() // Add unique ID
          };
          return [...group, newItem];
        }
        return group;
      });
    });
  };

  return (
    <div className="bg-blue-100 max-w-220 mx-auto p-3 rounded-2xl mb-2">
      <form>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="passage">উদ্দীপক (Passage)</Label>
          <textarea 
            id="passage" 
            className='bg-white p-3 rounded-2xl' 
            placeholder="উদ্দীপকটি লিখুন (write the passage)" 
          />
        </LabelInputContainer>
        <ImageDropzone imgFor={"Passage"} />
      </form>
      
      <div className='w-full flex justify-between items-center'>
        <button 
          disabled={mcqTemplet[pIdx].length >= 3}
          className="bg-black disabled:bg-gray-400 text-white font-semibold px-3 p-2 text-sm rounded-xl mb-2 transition-colors"
          onClick={handleAddMcq}
        >
          ADD MCQ ({mcqTemplet[pIdx].length}/3)
        </button>
        <p className='px-4 text-sm text-gray-600'>Maximum 3 MCQs allowed</p>
      </div>
      
      {mcqTemplet[pIdx].map((item: any, idx: number) => (
        <MCQTemplet_4_1 key={item.id || idx} />
      ))}
      
      <div className="flex justify-between">
        {children}
      </div>
    </div>
  );
};
const MCQTemplet_4_1 = () => {
  return (
    <form className={`p-3 rounded-2xl mb-2 bg-blue-300`}>
      <LabelInputContainer className="mb-2">
        <Label htmlFor="qStatement">প্রশ্ন (Question)</Label>
        <Input id="qStatement" placeholder="প্রশ্নটি লিখুন (Write the question)" type="text" />
      </LabelInputContainer>
      <ImageDropzone imgFor={"Question"} />
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
      <div className="flex justify-center">
        <Select>
          <SelectTrigger className="min-w-[250px] bg-white">
            <SelectValue placeholder="সঠিক উত্তর (Correct Answer)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">ক/A</SelectItem>
            <SelectItem value="1">খ/B</SelectItem>
            <SelectItem value="2">গ/C</SelectItem>
            <SelectItem value="3">ঘ/D</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
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
const DelBtn = ({ pIdx, cIdx, setMcqTemplet, mcqTemplet }: Props) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setMcqTemplet((prev) => {
      // Remove the entire group at pIdx
      return prev.filter((_, index) => index !== pIdx);
    });
  };

  return (
    <button 
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 p-2 text-sm rounded-xl transition-colors"
      onClick={handleDelete}
    > 
      Delete
    </button>
  );
};
export { MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4, LabelInputContainer, DelBtn };