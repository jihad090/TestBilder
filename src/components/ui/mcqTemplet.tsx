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
type Props = {
  mcqTemplet: any[];
  css: string;
  count: number;
  setMcqTemplet: React.Dispatch<React.SetStateAction<any[]>>;
};
const MCQTemplet_1 = ({ mcqTemplet, setMcqTemplet, css, count }: Props) => {
  return (
    <form className={`bg-blue-100 p-3 rounded-2xl mb-2 ${css}`}>
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
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"> Delete </button>
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
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"
        onClick={(e)=>{
          e.preventDefault()
          count++;
          setMcqTemplet((mcqTemplet:any) => [...mcqTemplet, { call: () => <MCQTemplet_1 mcqTemplet={mcqTemplet} setMcqTemplet={setMcqTemplet} css=""/> }]);
        }}
        > Copy </button>
      </div>
    </form>
  );
};
const MCQTemplet_2 = ({ mcqTemplet, setMcqTemplet, css, count }: Props) => {
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
      </div>
      <div className="flex justify-between">
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"> Delete </button>
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
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"
          onClick={(e)=>{
            e.preventDefault()
            count++;
            setMcqTemplet((mcqTemplet:any) => [...mcqTemplet, { call: () => <MCQTemplet_2 mcqTemplet={mcqTemplet} setMcqTemplet={setMcqTemplet} css=""/> }]);
          }}
        > Copy </button>
      </div>
    </form>
  )
}
const MCQTemplet_3 = ({ mcqTemplet, setMcqTemplet, css, count }: Props) => {
  return (
    <form className="bg-blue-100 p-3 rounded-2xl mb-2" >
      <LabelInputContainer className="mb-2">
        <Label htmlFor="qStatement">প্রশ্ন (Question)</Label>
        <Input id="qStatement" placeholder="প্রশ্নটি লিখুন (Write the question)" type="text" />
      </LabelInputContainer>
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
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"> Delete </button>
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
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"
          onClick={(e)=>{
            e.preventDefault()
            count++;
            setMcqTemplet((mcqTemplet:any) => [...mcqTemplet, { call: () => <MCQTemplet_3 mcqTemplet={mcqTemplet} setMcqTemplet={setMcqTemplet} css=""/> }]);
          }}
        > Copy </button>
      </div>
    </form>
  )
}
const MCQTemplet_4 = ({ mcqTemplet, setMcqTemplet, css, count }: Props) => {
  // const [mcqTemplet4, setMcqTemplet4] = React.useState<any>([]);
  return (
    <div className="bg-blue-100 p-3 rounded-2xl mb-2">
      <form  >
        <LabelInputContainer className="mb-2">
          <Label htmlFor="passage">উদ্দীপক (Passage)</Label>
          <textarea id="passage" className='bg-white p-3 rounded-2xl' placeholder="উদ্দীপকটি লিখুন (write the passage)" />
        </LabelInputContainer>
      </form>
      <MCQTemplet_1 mcqTemplet={mcqTemplet} setMcqTemplet={setMcqTemplet} count={count} css="bg-blue-300" />
      {

      }
      <div className="flex justify-between">
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"> Delete </button>
        <div>
        </div>
        <button className="bg-black text-white font-semibold px-3 p-2 text-sm rounded-xl"
          onClick={(e)=>{
            e.preventDefault()
            count++;
            setMcqTemplet((mcqTemplet:any) => [...mcqTemplet, { call: () => <MCQTemplet_4 mcqTemplet={mcqTemplet} setMcqTemplet={setMcqTemplet} count={count} css="bg-blue-300"/> }]);
          }}
        > Copy </button>
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

export { MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4, LabelInputContainer };