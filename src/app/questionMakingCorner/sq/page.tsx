
// "use client";
// import React, { useState, useEffect } from "react";
// import { SqTemplet, DelBtnSQ } from "@/components/ui/sqTemplet";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [sqTemplet, setSqTemplet] = useState<
//     { id: number; parentIdx: number; questionText: string;image?: string }[]
//   >([]);
//   const [sqTempletName, setSqTempletName] = useState<string>("sq-1");
//   const router = useRouter();

//   const generateId = () => Date.now() + Math.random();

//   const [userId, setUserId] = useState<string | null>(null);
//   const [primaryInfoId, setPrimaryInfoId] = useState<string | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUserId = localStorage.getItem("userId");
//       if (storedUserId) {
//         setUserId(storedUserId);
//       } else {
//         setErrorMsg("User not logged in! Redirecting to login...");
//         setTimeout(() => router.push("/login"), 2000);
//         return;
//       }

//       const params = new URLSearchParams(window.location.search);
//       const idFromUrl = params.get("primaryId");
//       if (idFromUrl) {
//         setPrimaryInfoId(idFromUrl);
//       } else {
//         setErrorMsg("Missing primaryId in URL!");
//       }
//     }
//   }, [router]);

//   const handleAddCQGroup = () => {
//     const newSQ = {
//       parentIdx: sqTemplet.length,
//       id: generateId(),
//       questionText: "",
//       image: "", 
//     };
//     setSqTemplet((prev) => [...prev, newSQ]);
//   };

//   const handleDeleteGroup = (idx: number) => {
//     setSqTemplet((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const handleQuestionTextChange = (idx: number, value: string) => {
//     setSqTemplet((prev) =>
//       prev.map((item, i) => (i === idx ? { ...item, questionText: value } : item))
//     );
//   };
//   const handleImageChange = (idx: number, image: string) => {
//   setSqTemplet((prev) =>
//     prev.map((item, i) => (i === idx ? { ...item, image: image } : item))
//   );
// };


//   const handleSubmit = async () => {
//     if (!userId || !primaryInfoId) {
//       alert("User or Primary Info ID missing!");
//       return;
//     }

//     const body = {
//       user: userId,
//       primaryInfo: primaryInfoId,
//       sqGroup: {
//         title: sqTempletName,
//         questions: sqTemplet.map((q) => ({
//            questionText: q.questionText || "",  
//            image: q.image || "",
//  })),
        
//       },
//     };

//     try {
//       const res = await fetch("/Api/sq", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       const result = await res.json();
//       if (result.success) {
//         alert("Short Question saved successfully!");
//       } else {
//         alert("Error: " + result.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong.");
//     }
//   };

//   const renderSQComponent = (item: any, arrayIndex: number) => {
//     return (
//       <SqTemplet
//         key={item.id}
//         value={item.questionText}
//         image={item.image}
//         onChange={(val) => handleQuestionTextChange(arrayIndex, val)}
//           onImageChange={(url) => handleImageChange(arrayIndex, url)}

//       >
//         <DelBtnSQ pIdx={arrayIndex} onDelete={() => handleDeleteGroup(arrayIndex)} />
//       </SqTemplet>
//     );
//   };

//   return (
//     <div id="test" className="my-15 w-full">
//       <div className="fixed top-[100px] z-10 w-full flex justify-center">
//         <div className="flex justify-between items-center max-w-2xl w-full bg-gray-400 p-2 rounded-2xl">
//           <span className="font-semibold">Add a new Short Question</span>
//           <button
//             className="px-6 py-1 bg-black text-white rounded-xl hover:bg-blue-700"
//             onClick={handleAddCQGroup}
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       <div className="mt-[50px] space-y-4">{sqTemplet.map(renderSQComponent)}</div>

//       <div className="mt-8 flex justify-center">
//         <button
//           className="px-3 py-1 bg-black text-white rounded-md hover:bg-blue-700 font-semibold"
//           onClick={handleSubmit}
//         >
//           Generate PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Page;




"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SqTemplet, DelBtnSQ } from "@/components/ui/sqTemplet"
import debounce from "lodash/debounce"

interface SQQuestion {
  id: string
  parentIdx: number
  questionText: string
  image?: string
  marks: number
  isComplete: boolean
}

const SQ = () => {
  const [sqTemplet, setSqTemplet] = useState<SQQuestion[]>([])
  const [sqTempletName, setSqTempletName] = useState<string>("sq-1")
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
    async (updatedTemplate: SQQuestion[]) => {
      if (!userId || !primaryInfoId || !templateId) {
        console.log("⚠️ Missing IDs for auto-save:", { userId, primaryInfoId, templateId })
        return
      }

      setSaveStatus("saving")

      try {
        const res = await fetch("/Api/sq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operation: "update",
            templateId: templateId,
            user: userId,
            primaryInfo: primaryInfoId,
            sqGroup: {
              title: sqTempletName,
              questions: updatedTemplate,
              isComplete: updatedTemplate.length > 0 && updatedTemplate.every((q) => q.isComplete),
            },
          }),
        })

        const data = await res.json()
        if (data.success) {
          setSaveStatus("saved")
          console.log("✅ SQ Template auto-saved successfully")
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
    [userId, primaryInfoId, templateId, sqTempletName],
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
      const res = await fetch(`/Api/sq?templateId=${tempId}`, {
        method: "GET",
      })
      const data = await res.json()
      if (data.success && data.data.sqGroup && data.data.sqGroup.questions) {
        const questions = data.data.sqGroup.questions.map((q: any, index: number) => ({
          id: q.id || `${Date.now()}-${index}`,
          parentIdx: index,
          questionText: q.questionText || "",
          image: q.image || "",
          marks: q.marks || 2,
          isComplete: !!(q.questionText?.trim() || q.image?.trim()),
        }))
        setSqTemplet(questions)
        console.log("✅ Loaded existing SQ template:", questions.length, "questions")
      } else {
        console.error("❌ Failed to load template:", data.message)
      }
    } catch (error) {
      console.error("❌ Error loading SQ template:", error)
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

  // ✅ Add new SQ question
  const handleAddSQQuestion = useCallback(() => {
    setSqTemplet((prevSqTemplet) => {
      const newSQ: SQQuestion = {
        id: generateId(),
        parentIdx: prevSqTemplet.length,
        questionText: "",
        image: "",
        marks: 2,
        isComplete: false,
      }

      const updated = [...prevSqTemplet, newSQ]

      // ✅ Trigger auto-save with updated data
      if (debouncedSaveRef.current) {
        debouncedSaveRef.current(updated)
      }

      return updated
    })
  }, [])

  // ✅ Delete SQ with immediate save
  const handleDeleteSQ = useCallback(
    async (pIdx: number) => {
      if (!templateId) return

      try {
        const res = await fetch(`/Api/sq?templateId=${templateId}&sqIndex=${pIdx}`, {
          method: "DELETE",
        })

        const data = await res.json()
        if (data.success) {
          setSqTemplet(data.data.sqGroup.questions || [])
          console.log("✅ SQ deleted successfully")
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
  const updateQuestionData = useCallback((newTemplate: SQQuestion[]) => {
    setSqTemplet(newTemplate)

    // ✅ Trigger auto-save
    if (debouncedSaveRef.current) {
      debouncedSaveRef.current(newTemplate)
    }
  }, [])

  // ✅ Update single question
  const handleQuestionTextChange = useCallback((idx: number, value: string) => {
    setSqTemplet((prev) => {
      const updated = prev.map((item, i) =>
        i === idx
          ? {
              ...item,
              questionText: value,
              isComplete: !!(value.trim() || item.image?.trim()),
            }
          : item,
      )

      // ✅ Trigger auto-save
      if (debouncedSaveRef.current) {
        debouncedSaveRef.current(updated)
      }

      return updated
    })
  }, [])

  // ✅ Update image
  const handleImageChange = useCallback((idx: number, image: string) => {
    setSqTemplet((prev) => {
      const updated = prev.map((item, i) =>
        i === idx
          ? {
              ...item,
              image: image,
              isComplete: !!(item.questionText?.trim() || image.trim()),
            }
          : item,
      )

      // ✅ Trigger auto-save
      if (debouncedSaveRef.current) {
        debouncedSaveRef.current(updated)
      }

      return updated
    })
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
      const res = await fetch("/Api/sq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "update",
          templateId: templateId,
          user: userId,
          primaryInfo: primaryInfoId,
          sqGroup: {
            title: sqTempletName,
            questions: sqTemplet,
            isComplete: sqTemplet.length > 0 && sqTemplet.every((q) => q.isComplete),
          },
        }),
      })

      const data = await res.json()
      if (data.success) {
        setSaveStatus("saved")
        alert("SQ Template finalized! Ready for PDF generation.")
        console.log("✅ Final SQ template saved:", data.data)
      } else {
        setSaveStatus("error")
        alert("Error: " + data.message)
      }
    } catch (error) {
      setSaveStatus("error")
      console.error("❌ Submit error:", error)
      alert("Network error occurred")
    }
  }, [userId, primaryInfoId, templateId, sqTemplet, sqTempletName])

  // ✅ Render SQ components
  const renderSQComponent = useCallback(
    (item: SQQuestion, index: number) => {
      return (
        <SqTemplet
          key={item.id}
          value={item.questionText}
          image={item.image}
          marks={item.marks}
          onChange={(val) => handleQuestionTextChange(index, val)}
          onImageChange={(url) => handleImageChange(index, url)}
        >
          <DelBtnSQ pIdx={index} onDelete={() => handleDeleteSQ(index)} />
        </SqTemplet>
      )
    },
    [handleQuestionTextChange, handleImageChange, handleDeleteSQ],
  )

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading SQ template...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-15 w-full">
      {errorMsg && <div className="text-red-600 text-center my-4 font-semibold">{errorMsg}</div>}

      {/* ✅ Header with Add button */}
      <div className="fixed top-[100px] z-10 w-full flex justify-center">
        <div className="flex justify-between items-center max-w-2xl w-full bg-gray-400 p-2 rounded-2xl">
          <span className="font-semibold">Add a new Short Question</span>
          <button
            className="px-6 py-1 bg-black text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
            onClick={handleAddSQQuestion}
            disabled={!!errorMsg}
          >
            Add
          </button>
        </div>
      </div>

      {/* ✅ Render all SQ components */}
      <div className="mt-[120px] space-y-4">{sqTemplet.map((item, idx) => renderSQComponent(item, idx))}</div>

      {/* ✅ Generate PDF button */}
      <div className="mt-8 flex justify-center">
        <button
          className="px-3 py-1 bg-black text-white rounded-md hover:bg-blue-700 font-semibold disabled:opacity-50"
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
        {sqTemplet.length} question{sqTemplet.length !== 1 ? "s" : ""} added
      </div>
    </div>
  )
}

export default SQ
