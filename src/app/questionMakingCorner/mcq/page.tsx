
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DelBtn, MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4 } from "@/components/ui/mcqTemplet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Mcq = () => {
  const [mcqTemplet, setMcqTemplet] = useState<any[]>([])
  const [mcqTempletName, setMcqTempletName] = useState<string>("mcq-1")
  const [userId, setUserId] = useState<string | null>(null)
  const [primaryInfoId, setPrimaryInfoId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const router = useRouter()

  const generateId = () => Date.now() + Math.random()

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const storedUserId = localStorage.getItem("userId")
        if (storedUserId) {
          setUserId(storedUserId)
        } else {
          setErrorMsg("User not logged in! Redirecting to login...")
          setTimeout(() => router.push("/login"), 2000)
          return
        }

        const params = new URLSearchParams(window.location.search)
        const idFromUrl = params.get("primaryId")
        if (idFromUrl) {
          setPrimaryInfoId(idFromUrl)
        } else {
          setErrorMsg("Missing primaryId in URL!")
        }
      }
    }

    fetchData()
  }, [router])

  const handleAddMcqGroup = () => {
    let newGroup

    if (mcqTempletName === "mcq-4") {
      // MCQ-4: passage fields + subQuestions array (NO childIdx)
      newGroup = [
        {
          mcqType: mcqTempletName,
          parentIdx: mcqTemplet.length,
          // childIdx: 0,  // ❌ Removed childIdx for main MCQ
          id: generateId(),
          passage: "",
          passageImage: "",
          subQuestions: [], // ✅ Empty subQuestions array
        },
      ]
    } else {
      // অন্য MCQ types: question fields (NO childIdx)
      newGroup = [
        {
          mcqType: mcqTempletName,
          parentIdx: mcqTemplet.length,
          // childIdx: 0,  // ❌ Removed childIdx for main MCQ
          id: generateId(),
          questionText: "",
          image: "",
          options: mcqTempletName === "mcq-2" ? ["", ""] : ["", "", "", ""],
          correctAnswer: "",
          marks: 1,
        },
      ]
    }

    setMcqTemplet((prev) => [...prev, newGroup])
  }

  const handleSubmit = async () => {
    if (!userId || !primaryInfoId) {
      alert("User ID or Primary Info ID missing")
      return
    }

    // Log the data before sending to see what's being submitted
    console.log("Submitting MCQ data:", mcqTemplet)

    const payload = {
      user: userId,
      primaryInfo: primaryInfoId,
      mcqs: mcqTemplet,
    }

    try {
      const res = await fetch("/Api/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (data.success) {
        alert("Saved successfully!")
        console.log("Saved data:", data.data)
      } else {
        alert("Error: " + data.message)
        console.error("Save error:", data)
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Network error occurred")
    }
  }

  const renderMcqComponent = (item: any, arrayIndex: number) => {
    const keyValue = item[0].id || arrayIndex

    const deleteBtn = <DelBtn pIdx={arrayIndex} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet} />

    // Pass required props to each component (NO cIdx for main components)
    const commonProps = {
      pIdx: arrayIndex,
      mcqTemplet,
      setMcqTemplet,
    }

    switch (item[0]?.mcqType) {
      case "mcq-1":
        return (
          <MCQTemplet_1 key={keyValue} {...commonProps}>
            {deleteBtn}
          </MCQTemplet_1>
        )
      case "mcq-2":
        return (
          <MCQTemplet_2 key={keyValue} {...commonProps}>
            {deleteBtn}
          </MCQTemplet_2>
        )
      case "mcq-3":
        return (
          <MCQTemplet_3 key={keyValue} {...commonProps}>
            {deleteBtn}
          </MCQTemplet_3>
        )
      case "mcq-4":
        return (
          <MCQTemplet_4 key={keyValue} pIdx={arrayIndex} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet}>
            {deleteBtn}
          </MCQTemplet_4>
        )
      default:
        return null
    }
  }

  return (
    <div id="test" className="my-15 w-full">
      <div className="justify-between items-center w-full fixed top-[100px] z-10">
        <div className="justify-between item-center w-full flex bg-gray-400 p-2 rounded-2xl max-w-200 m-auto">
          <div className="flex items-center text-md font-semibold">
            <div className="w-22">MCQ Type: </div>
            <Select defaultValue="mcq-1" value={mcqTempletName} onValueChange={setMcqTempletName}>
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

      <div className="justify-center flex text-white mt-10">
        <button
          className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white"
          onClick={handleSubmit}
        >
          Generate PDF
        </button>
      </div>

      {errorMsg && <div className="text-center text-red-500 mt-4">{errorMsg}</div>}
    </div>
  )
}

export default Mcq
