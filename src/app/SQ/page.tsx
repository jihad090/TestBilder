"use client"

import { useRef } from "react"

export default function IframeMCQ() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print()
    }
  }

  return (
    <div className="w-full justify-items-center">  
      <div >
        <iframe ref={iframeRef} src="/demoSQ/SQ/sq.html" width="600" height="750" />  
      </div>
      <div className="">
        <button onClick={handlePrint} className=" fixed z-100 bg-black text-white py-1 w-[100px] font-bold rounded-xl hover:bg-blue-700 bottom-10 mx-[-50px]">Print</button>
      </div>      
    </div>
  );
}