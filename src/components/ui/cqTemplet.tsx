import React from 'react'
import { Label } from "../../ui/label"; 
import { Input } from "../../ui/input"; 
import { cn } from "../../lib/utils"; 
import ImageDropzone from '@/components/ImageDropzone'

type Props = {
  css?: string;
  cqTempIdx?: string;
  cqTemplet?: any;
  index?: string;
  pIdx?: number;
  setCqTemplet?: React.Dispatch<React.SetStateAction<any[]>>;
};

const CqTemplet_1 = ({ children }: { children: React.ReactNode }) => {
  const cqInfo = [
    { qNum: 1, banglaNum: "ক", englishNum: "A", defaultMarks: 1 },
    { qNum: 2, banglaNum: "খ", englishNum: "B", defaultMarks: 2 },
    { qNum: 3, banglaNum: "গ", englishNum: "C", defaultMarks: 3 },
    { qNum: 4, banglaNum: "ঘ", englishNum: "D", defaultMarks: 4 },
  ];
  return (
    <div className='w-full'>
      <div className=" bg-blue-100 mx-auto max-w-220 p-3 rounded-2xl mb-2 fon">      

        <div className=" p-1 rounded-xl mb-2">
          <Label htmlFor="passage">উদ্দীপক (Passage)</Label>
          <textarea 
            id="passage" 
            className='bg-white p-3 rounded-xl w-full mt-2' 
            rows={4}
            placeholder="উদ্দীপকটি লিখুন (Write the passage)" 
          />
          <ImageDropzone imgFor={"Passage"} />
        </div>

        {
        cqInfo.map((item) => (
          <form key={item.qNum} className="bg-blue-300 p-2 rounded-xl mb-2">
            <div className='flex items-center'>
              <h4 className="font-semibold w-12 mt-6 mb-2">{item.banglaNum} ({item.englishNum})</h4>
              <div className='flex w-full justify-between'>
                <div className="mb-2 w-full">
                  <Label htmlFor={`qStatement${item}`}>প্রশ্ন (Question)</Label>
                  <Input 
                    id={`qStatement${item.englishNum}`} 
                    placeholder={`প্রশ্ন ${item.banglaNum} লিখুন (Write question ${item.englishNum})`} 
                    type="text" 
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor={`marks${item.qNum}`}>নম্বর (Marks)</Label>
                  <Input 
                    id={`marks${item.qNum}`} 
                    placeholder="নম্বর" 
                    type="number" 
                    className="w-20"
                    defaultValue={item.defaultMarks}
                  />
                </div>               
              </div>
            </div>
            <ImageDropzone imgFor={``} />
          </form> 
        ))}
        <div className="flex justify-between mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

const CqTemplet_2 = ({ children }: { children: React.ReactNode }) => {
  const cqInfo = [
    { qNum: 1, banglaNum: "ক", englishNum: "A", defaultMarks: 2 },
    { qNum: 2, banglaNum: "খ", englishNum: "B", defaultMarks: 4 },
    { qNum: 3, banglaNum: "গ", englishNum: "C", defaultMarks: 4 },
  ];
  return (
    <div className='w-full'>
      <div className=" bg-blue-100 mx-auto max-w-220 p-3 rounded-2xl mb-2 fon">      

        <div className=" p-1 rounded-xl mb-2">
          <Label htmlFor="passage">উদ্দীপক (Passage)</Label>
          <textarea 
            id="passage" 
            className='bg-white p-3 rounded-xl w-full mt-2' 
            rows={4}
            placeholder="উদ্দীপকটি লিখুন (Write the passage)" 
          />
          <ImageDropzone imgFor={"Passage"} />
        </div>

        {
        cqInfo.map((item) => (
          <form key={item.qNum} className="bg-blue-300 p-2 rounded-xl mb-2">
            <div className='flex items-center'>
              <h4 className="font-semibold w-12 mt-6 mb-2">{item.banglaNum} ({item.englishNum})</h4>
              <div className='flex w-full justify-between'>
                <div className="mb-2 w-full">
                  <Label htmlFor={`qStatement${item}`}>প্রশ্ন (Question)</Label>
                  <Input 
                    id={`qStatement${item.englishNum}`} 
                    placeholder={`প্রশ্ন ${item.banglaNum} লিখুন (Write question ${item.englishNum})`} 
                    type="text" 
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor={`marks${item.qNum}`}>নম্বর (Marks)</Label>
                  <Input 
                    id={`marks${item.qNum}`} 
                    placeholder="নম্বর" 
                    type="number" 
                    className="w-20"
                    defaultValue={item.defaultMarks}
                  />
                </div>               
              </div>
            </div>
            <ImageDropzone imgFor={``} />
          </form> 
        ))}
        <div className="flex justify-between mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

const DelBtnCQ = ({ pIdx, setCqTemplet }: Props) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (setCqTemplet && typeof pIdx === 'number') {
      setCqTemplet((prev) => {
        // Remove the entire CQ at pIdx
        return prev.filter((_, index) => index !== pIdx);
      });
    }
  };

  return (
    <button 
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 p-2 text-sm rounded-xl"
      onClick={handleDelete}
    > 
      Delete CQ
    </button>
  );
};



export { CqTemplet_1, CqTemplet_2, DelBtnCQ };