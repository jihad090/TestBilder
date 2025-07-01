
// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { DelBtn, MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4 } from "@/components/ui/mcqTemplet"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// const Mcq = () => {
//   const [mcqTemplet, setMcqTemplet] = useState<any[]>([])
//   const [mcqTempletName, setMcqTempletName] = useState<string>("mcq-1")
//   const [userId, setUserId] = useState<string | null>(null)
//   const [primaryInfoId, setPrimaryInfoId] = useState<string | null>(null)
//   const [errorMsg, setErrorMsg] = useState<string>("")
//   const router = useRouter()

//   //const generateId = () => Date.now() + Math.random()

//   useEffect(() => {
//     const fetchData = async () => {
//       if (typeof window !== "undefined") {
//         const storedUserId = localStorage.getItem("userId")
//         if (storedUserId) {
//           setUserId(storedUserId)
//         } else {
//           setErrorMsg("User not logged in! Redirecting to login...")
//           setTimeout(() => router.push("/login"), 2000)
//           return
//         }

//         const params = new URLSearchParams(window.location.search)
//         const idFromUrl = params.get("primaryId")
//         if (idFromUrl) {
//           setPrimaryInfoId(idFromUrl)
//         } else {
//           setErrorMsg("Missing primaryId in URL!")
//         }
//       }
//     }

//     fetchData()
//   }, [router])

//   const handleAddMcqGroup = () => {
//     let newGroup

//     if (mcqTempletName === "mcq-4") {
//       // MCQ-4: passage fields + subQuestions array (NO childIdx)
//       newGroup = [
//         {
//           mcqType: mcqTempletName,
//           parentIdx: mcqTemplet.length,
            
//          // id: generateId(),
//           passage: "",
//           passageImage: "",
//           subQuestions: [], //  Empty subQuestions array
//         },
//       ]
//     } else {
//       // অন্য MCQ types: question fields (NO childIdx)
//       newGroup = [
//         {
//           mcqType: mcqTempletName,
//           parentIdx: mcqTemplet.length,
//           // childIdx: 0,  //  Removed childIdx for main MCQ
//          // id: generateId(),
//           questionText: "",
//           image: "",
//           options: mcqTempletName === "mcq-2" ? ["", ""] : ["", "", "", ""],
//           correctAnswer: "",
//           marks: 1,
//         },
//       ]
//     }

//     setMcqTemplet((prev) => [...prev, newGroup])
//   }

//   const handleSubmit = async () => {
//     if (!userId || !primaryInfoId) {
//       alert("User ID or Primary Info ID missing")
//       return
//     }

//     // Log the data before sending to see what's being submitted
//     console.log("Submitting MCQ data:", mcqTemplet)

//     const payload = {
//       user: userId,
//       primaryInfo: primaryInfoId,
//       mcqs: mcqTemplet,
//     }

//     try {
//       const res = await fetch("/Api/mcq", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       })

//       const data = await res.json()
//       if (data.success) {
//         alert("Saved successfully!")
//         console.log("Saved data:", data.data)
//       } else {
//         alert("Error: " + data.message)
//         console.error("Save error:", data)
//       }
//     } catch (error) {
//       console.error("Submit error:", error)
//       alert("Network error occurred")
//     }
//   }

//   const renderMcqComponent = (item: any, arrayIndex: number) => {
//     const keyValue = item[0].id || arrayIndex

//     const deleteBtn = <DelBtn pIdx={arrayIndex} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet} />

//     // Pass required props to each component (NO cIdx for main components)
//     const commonProps = {
//       pIdx: arrayIndex,
//       mcqTemplet,
//       setMcqTemplet,
//     }

//     switch (item[0]?.mcqType) {
//       case "mcq-1":
//         return (
//           <MCQTemplet_1 key={keyValue} {...commonProps}>
//             {deleteBtn}
//           </MCQTemplet_1>
//         )
//       case "mcq-2":
//         return (
//           <MCQTemplet_2 key={keyValue} {...commonProps}>
//             {deleteBtn}
//           </MCQTemplet_2>
//         )
//       case "mcq-3":
//         return (
//           <MCQTemplet_3 key={keyValue} {...commonProps}>
//             {deleteBtn}
//           </MCQTemplet_3>
//         )
//       case "mcq-4":
//         return (
//           <MCQTemplet_4 key={keyValue} pIdx={arrayIndex} setMcqTemplet={setMcqTemplet} mcqTemplet={mcqTemplet}>
//             {deleteBtn}
//           </MCQTemplet_4>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div id="test" className="my-15 w-full">
//       <div className="justify-between items-center w-full fixed top-[100px] z-10">
//         <div className="justify-between item-center w-full flex bg-gray-400 p-2 rounded-2xl max-w-200 m-auto">
//           <div className="flex items-center text-md font-semibold">
//             <div className="w-22">MCQ Type: </div>
//             <Select defaultValue="mcq-1" value={mcqTempletName} onValueChange={setMcqTempletName}>
//               <SelectTrigger className="min-w-[380px] bg-white">
//                 <SelectValue placeholder="Select MCQ type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="mcq-1">সাধারণ বহুনির্বাচনী (Standard Multiple Choice Question)</SelectItem>
//                 <SelectItem value="mcq-2">সত্য/মিথ্যা (True/False)</SelectItem>
//                 <SelectItem value="mcq-3">বহুপদী ও সমাপ্তিসূচক (Multiple Completion Based Question)</SelectItem>
//                 <SelectItem value="mcq-4">অভিন্ন তথ্যভিত্তিক (Situation Set Based Question)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <button
//               className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black"
//               onClick={handleAddMcqGroup}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </div>

//       {mcqTemplet.map((item, arrayIndex) => renderMcqComponent(item, arrayIndex))}

//       <div className="justify-center flex text-white mt-10">
//         <button
//           className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white"
//           onClick={handleSubmit}
//         >
//           Generate PDF
//         </button>
//       </div>

//       {errorMsg && <div className="text-center text-red-500 mt-4">{errorMsg}</div>}
//     </div>
//   )
// }

// export default Mcq








"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DelBtn, MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4 } from "@/components/ui/mcqTemplet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import debounce from "lodash/debounce"

interface MCQQuestion {
  id: string
  mcqType: string
  parentIdx: number
  questionText?: string
  image?: string
  options?: string[]
  correctAnswer?: string
  marks: number
  passage?: string
  passageImage?: string
  subQuestions?: any[]
  infoItems?: string[]
  isComplete: boolean
}

const MCQ = () => {
  const [mcqTemplet, setMcqTemplet] = useState<MCQQuestion[]>([])
  const [mcqTempletName, setMcqTempletName] = useState<string>("mcq-1")
  const [userId, setUserId] = useState<string | null>(null)
  const [primaryInfoId, setPrimaryInfoId] = useState<string | null>(null)
  const [templateId, setTemplateId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const router = useRouter()
  const searchParams = useSearchParams()

  // ✅ Auto-save function with proper error handling
  const saveToDatabase = useCallback(
    async (updatedTemplate: MCQQuestion[]) => {
      if (!userId || !primaryInfoId || !templateId) {
        console.log("⚠️ Missing IDs for auto-save:", { userId, primaryInfoId, templateId })
        return
      }

      setSaveStatus("saving")

      try {
        const res = await fetch("/Api/mcq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operation: "update",
            templateId: templateId,
            user: userId,
            primaryInfo: primaryInfoId,
            mcqs: updatedTemplate,
          }),
        })

        const data = await res.json()
        if (data.success) {
          setSaveStatus("saved")
          console.log("✅ MCQ Template auto-saved successfully")
          // Reset to idle after 2 seconds
          setTimeout(() => setSaveStatus("idle"), 2000)
        } else {
          setSaveStatus("error")
          console.error("❌ Auto-save failed:", data.message)
          // Reset to idle after 3 seconds
          setTimeout(() => setSaveStatus("idle"), 3000)
        }
      } catch (err) {
        setSaveStatus("error")
        console.error("❌ Auto-save network error:", err)
        setTimeout(() => setSaveStatus("idle"), 3000)
      }
    },
    [userId, primaryInfoId, templateId],
  )

  // ✅ Create debounced save function only once
  const debouncedSaveRef = useRef<any>(null)

  useEffect(() => {
    // Create debounced function only when saveToDatabase changes
    debouncedSaveRef.current = debounce(saveToDatabase, 1000)

    // Cleanup function to cancel pending debounced calls
    return () => {
      if (debouncedSaveRef.current) {
        debouncedSaveRef.current.cancel()
      }
    }
  }, [saveToDatabase])

  // ✅ Load existing template
  const loadExistingTemplate = async (tempId: string) => {
    try {
      const res = await fetch(`/Api/mcq?templateId=${tempId}`, {
        method: "GET",
      })
      const data = await res.json()
      if (data.success && data.data.mcqs) {
        const questions = data.data.mcqs.map((q: any, index: number) => ({
          id: q.id || `${Date.now()}-${index}`,
          mcqType: q.mcqType || "mcq-1",
          parentIdx: index,
          questionText: q.questionText || "",
          image: q.image || "",
          options: q.options || (q.mcqType === "mcq-2" ? ["", ""] : ["", "", "", ""]),
          correctAnswer: q.correctAnswer || "",
          marks: q.marks || 1,
          passage: q.passage || "",
          passageImage: q.passageImage || "",
          subQuestions: q.subQuestions || [],
          infoItems: q.infoItems || [],
          isComplete: validateMCQ(q),
        }))
        setMcqTemplet(questions)
        console.log("✅ Loaded existing MCQ template:", questions.length, "questions")
      } else {
        console.error("❌ Failed to load template:", data.message)
      }
    } catch (error) {
      console.error("❌ Error loading MCQ template:", error)
    }
  }

  // ✅ Initialize component data
  useEffect(() => {
    const initializeData = async () => {
      if (typeof window !== "undefined") {
        const storedUserId = localStorage.getItem("userId")
        if (storedUserId) {
          setUserId(storedUserId)
        } else {
          setErrorMsg("User not logged in! Redirecting to login...")
          setTimeout(() => router.push("/login"), 2000)
          return
        }

        const primaryId = searchParams.get("primaryId")
        const tempId = searchParams.get("templateId")

        if (primaryId) {
          setPrimaryInfoId(primaryId)
        } else {
          setErrorMsg("Missing primaryId in URL!")
        }

        if (tempId) {
          setTemplateId(tempId)
          await loadExistingTemplate(tempId)
        } else {
          setErrorMsg("Missing templateId in URL!")
        }
      }

      setIsLoading(false)
    }

    initializeData()
  }, [])

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

  // ✅ Validate MCQ function
  const validateMCQ = (mcq: any) => {
    if (mcq.mcqType === "mcq-4") {
      // Passage-based MCQ
      const hasPassage = mcq.passage?.trim() || mcq.passageImage?.trim()
      const hasSubQuestions = mcq.subQuestions && mcq.subQuestions.length > 0
      return hasPassage && hasSubQuestions
    } else {
      // Regular MCQ
      const hasQuestion = mcq.questionText?.trim() || mcq.image?.trim()
      const hasOptions = mcq.options && mcq.options.every((opt: string) => opt?.trim())
      const hasCorrectAnswer = mcq.correctAnswer !== "" && mcq.correctAnswer !== null
      return hasQuestion && hasOptions && hasCorrectAnswer
    }
  }

  // ✅ Add new MCQ question
  const handleAddMcqGroup = useCallback(() => {
    setMcqTemplet((prevMcqTemplet) => {
      let newMCQ: MCQQuestion

      if (mcqTempletName === "mcq-4") {
        // MCQ-4: passage fields + subQuestions array
        newMCQ = {
          id: generateId(),
          mcqType: mcqTempletName,
          parentIdx: prevMcqTemplet.length,
          passage: "",
          passageImage: "",
          subQuestions: [],
          marks: 1,
          isComplete: false,
        }
      } else {
        // Other MCQ types: question fields
        newMCQ = {
          id: generateId(),
          mcqType: mcqTempletName,
          parentIdx: prevMcqTemplet.length,
          questionText: "",
          image: "",
          options: mcqTempletName === "mcq-2" ? ["", ""] : ["", "", "", ""],
          correctAnswer: "",
          marks: 1,
          infoItems: mcqTempletName === "mcq-3" ? ["", "", ""] : undefined,
          isComplete: false,
        }
      }

      const updated = [...prevMcqTemplet, newMCQ]

      // ✅ Trigger auto-save with updated data
      if (debouncedSaveRef.current) {
        debouncedSaveRef.current(updated)
      }

      return updated
    })
  }, [mcqTempletName])

  // ✅ Delete MCQ with immediate save
  const handleDeleteMCQ = useCallback(
    async (pIdx: number) => {
      if (!templateId) return

      try {
        const res = await fetch(`/Api/mcq?templateId=${templateId}&mcqIndex=${pIdx}`, {
          method: "DELETE",
        })

        const data = await res.json()
        if (data.success) {
          setMcqTemplet(data.data.mcqs || [])
          console.log("✅ MCQ deleted successfully")
        } else {
          console.error("❌ Delete failed:", data.message)
        }
      } catch (error) {
        console.error("❌ Delete error:", error)
      }
    },
    [templateId],
  )

  // ✅ Update question data with auto-save
  const updateQuestionData = useCallback((newTemplate: MCQQuestion[]) => {
    setMcqTemplet(newTemplate)

    // ✅ Trigger auto-save
    if (debouncedSaveRef.current) {
      debouncedSaveRef.current(newTemplate)
    }
  }, [])

  // ✅ Final submit for PDF generation
  const handleSubmit = useCallback(async () => {
    if (!userId || !primaryInfoId || !templateId) {
      alert("Missing required IDs")
      return
    }

    // Cancel any pending auto-save before final save
    if (debouncedSaveRef.current) {
      debouncedSaveRef.current.cancel()
    }

    setSaveStatus("saving")

    try {
      const res = await fetch("/Api/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "update",
          templateId: templateId,
          user: userId,
          primaryInfo: primaryInfoId,
          mcqs: mcqTemplet,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setSaveStatus("saved")
        alert("MCQ Template finalized! Ready for PDF generation.")
        console.log("✅ Final MCQ template saved:", data.data)
      } else {
        setSaveStatus("error")
        alert("Error: " + data.message)
      }
    } catch (error) {
      setSaveStatus("error")
      console.error("❌ Submit error:", error)
      alert("Network error occurred")
    }
  }, [userId, primaryInfoId, templateId, mcqTemplet])

  // ✅ Render MCQ components
  const renderMcqComponent = useCallback(
    (item: MCQQuestion, index: number) => {
      const deleteBtn = (
        <DelBtn
          pIdx={index}
          setMcqTemplet={updateQuestionData}
          mcqTemplet={mcqTemplet}
          onDelete={() => handleDeleteMCQ(index)}
        />
      )

      const commonProps = {
        pIdx: index,
        mcqTemplet,
        setMcqTemplet: updateQuestionData,
      }

      switch (item.mcqType) {
        case "mcq-1":
          return (
            <MCQTemplet_1 key={item.id} {...commonProps}>
              {deleteBtn}
            </MCQTemplet_1>
          )
        case "mcq-2":
          return (
            <MCQTemplet_2 key={item.id} {...commonProps}>
              {deleteBtn}
            </MCQTemplet_2>
          )
        case "mcq-3":
          return (
            <MCQTemplet_3 key={item.id} {...commonProps}>
              {deleteBtn}
            </MCQTemplet_3>
          )
        case "mcq-4":
          return (
            <MCQTemplet_4 key={item.id} pIdx={index} setMcqTemplet={updateQuestionData} mcqTemplet={mcqTemplet}>
              {deleteBtn}
            </MCQTemplet_4>
          )
        default:
          return null
      }
    },
    [mcqTemplet, updateQuestionData, handleDeleteMCQ],
  )

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading MCQ template...</p>
        </div>
      </div>
    )
  }

  return (
    <div id="test" className="my-15 w-full">
      {errorMsg && <div className="text-red-600 text-center my-4 font-semibold">{errorMsg}</div>}

      {/* ✅ Header with MCQ type selector */}
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
              className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black disabled:opacity-50"
              onClick={handleAddMcqGroup}
              disabled={!!errorMsg}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Render all MCQ components */}
      <div className="mt-[120px]">{mcqTemplet.map((item, idx) => renderMcqComponent(item, idx))}</div>

      {/* ✅ Generate PDF button */}
      <div className="justify-center flex text-white mt-10">
        <button
          className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white disabled:opacity-50"
          onClick={handleSubmit}
          disabled={!!errorMsg || saveStatus === "saving"}
        >
          {saveStatus === "saving" ? "Saving..." : "Generate PDF"}
        </button>
      </div>

      {/* ✅ Auto-save status indicator */}
      <div className="text-center mt-4">
        <span
          className={`text-sm font-medium ${
            saveStatus === "saving"
              ? "text-blue-600"
              : saveStatus === "saved"
                ? "text-green-600"
                : saveStatus === "error"
                  ? "text-red-600"
                  : "text-gray-500"
          }`}
        >
          {saveStatus === "saving" && "💾 Auto-saving..."}
          {saveStatus === "saved" && "✅ Auto-saved successfully"}
          {saveStatus === "error" && "❌ Auto-save failed"}
          {saveStatus === "idle" && "🔄 Auto-save enabled"}
        </span>
      </div>

      {/* ✅ Template info */}
      <div className="text-center mt-2 text-xs text-gray-500">
        {mcqTemplet.length} MCQ question{mcqTemplet.length !== 1 ? "s" : ""} added
      </div>
    </div>
  )
}

export default MCQ
