

"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { DelBtn, MCQTemplet_1, MCQTemplet_2, MCQTemplet_3, MCQTemplet_4 } from "@/components/ui/mcqTemplet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, Check, Clock, AlertCircle } from "lucide-react"
import debounce from "lodash/debounce"

const Mcq = () => {
  const [mcqTemplet, setMcqTemplet] = useState<any[]>([])
  const [mcqTempletName, setMcqTempletName] = useState<string>("mcq-1")
  const [userId, setUserId] = useState<string | null>(null)
  const [primaryInfoId, setPrimaryInfoId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [lastSaved, setLastSaved] = useState<Date | undefined>()
  const router = useRouter()

  // Auto-save function
  const autoSaveData = async (data: any[]) => {
    if (!userId || !primaryInfoId || data.length === 0) return

    setSaveStatus("saving")

    const payload = {
      user: userId,
      primaryInfo: primaryInfoId,
      mcqs: data,
    }

    try {
      const res = await fetch("/Api/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (result.success) {
        setSaveStatus("saved")
        setLastSaved(new Date())
        setTimeout(() => setSaveStatus("idle"), 2000) // Hide saved status after 2 seconds
      } else {
        setSaveStatus("error")
        console.error("Auto-save failed:", result.message)
      }
    } catch (error) {
      setSaveStatus("error")
      console.error("Auto-save error:", error)
    }
  }

  // Debounced save function - 2 seconds delay
  const debouncedSave = useCallback(
    debounce((data: any[]) => {
      autoSaveData(data)
    }, 2000),
    [userId, primaryInfoId],
  )

  // Auto-save when mcqTemplet changes
  useEffect(() => {
    if (mcqTemplet.length > 0 && userId && primaryInfoId) {
      debouncedSave(mcqTemplet)
    }
  }, [mcqTemplet, debouncedSave, userId, primaryInfoId])

  // Individual MCQ delete function
  const handleDeleteIndividualMCQ = async (mcqId: string) => {
    if (!userId || !primaryInfoId) return

    try {
      const res = await fetch("/Api/mcq", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          primaryInfo: primaryInfoId,
          mcqId: mcqId,
          deleteType: "single",
        }),
      })

      const data = await res.json()
      if (data.success) {
        setMcqTemplet(data.data.mcqs)
        console.log("MCQ deleted successfully")
      } else {
        alert("Error deleting MCQ: " + data.message)
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Network error occurred")
    }
  }

  // Load existing data on component mount
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

        const params = new URLSearchParams(window.location.search)
        const idFromUrl = params.get("primaryId")
        if (idFromUrl) {
          setPrimaryInfoId(idFromUrl)

          // Load existing template data
          try {
            const response = await fetch(`/Api/mcq?user=${storedUserId}&primaryInfo=${idFromUrl}`)
            const data = await response.json()

            if (data.success && data.data.mcqs) {
              setMcqTemplet(data.data.mcqs)
              console.log("Loaded existing data:", data.data.mcqs)
            }
          } catch (error) {
            console.error("Error loading existing data:", error)
          }
        } else {
          setErrorMsg("Missing primaryId in URL!")
        }
      }
      setLoading(false)
    }

    initializeData()
  }, [router])

  const handleAddMcqGroup = () => {
    let newGroup
    if (mcqTempletName === "mcq-4") {
      newGroup = [
        {
          mcqType: mcqTempletName,
          parentIdx: mcqTemplet.length,
          passage: "",
          passageImage: "",
          subQuestions: [],
        },
      ]
    } else {
      newGroup = [
        {
          mcqType: mcqTempletName,
          parentIdx: mcqTemplet.length,
          questionText: "",
          image: "",
          options: mcqTempletName === "mcq-2" ? ["", ""] : ["", "", "", ""],
          correctAnswer: "",
          marks: 1,
          ...(mcqTempletName === "mcq-3" && { infoItems: ["", "", ""] }),
        },
      ]
    }
    setMcqTemplet((prev) => [...prev, newGroup])
  }

  // Manual save function
  const handleSubmit = async () => {
    if (!userId || !primaryInfoId) {
      alert("User ID or Primary Info ID missing")
      return
    }

    setSaving(true)
    console.log("Manual save - Submitting MCQ data:", mcqTemplet)

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
        if (data.data.mcqs) {
          setMcqTemplet(data.data.mcqs)
        }
      } else {
        alert("Error: " + data.message)
        console.error("Save error:", data)
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Network error occurred")
    } finally {
      setSaving(false)
    }
  }

  const renderMcqComponent = (item: any, arrayIndex: number) => {
    const keyValue = item[0].id || arrayIndex
    const deleteBtn = (
      <DelBtn
        pIdx={arrayIndex}
        setMcqTemplet={setMcqTemplet}
        mcqTemplet={mcqTemplet}
        onDeleteIndividual={handleDeleteIndividualMCQ}
      />
    )

    const commonProps = {
      pIdx: arrayIndex,
      mcqTemplet,
      setMcqTemplet,
      onDeleteIndividual: handleDeleteIndividualMCQ,
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
          <MCQTemplet_4
            key={keyValue}
            pIdx={arrayIndex}
            setMcqTemplet={setMcqTemplet}
            mcqTemplet={mcqTemplet}
            onDeleteIndividual={handleDeleteIndividualMCQ}
          >
            {deleteBtn}
          </MCQTemplet_4>
        )
      default:
        return null
    }
  }

  // Save status indicator component
  const SaveStatusIndicator = () => {
    const getStatusIcon = () => {
      switch (saveStatus) {
        case "saving":
          return <Clock className="w-4 h-4 animate-spin" />
        case "saved":
          return <Check className="w-4 h-4 text-green-500" />
        case "error":
          return <AlertCircle className="w-4 h-4 text-red-500" />
        default:
          return null
      }
    }

    const getStatusText = () => {
      switch (saveStatus) {
        case "saving":
          return "Saving..."
        case "saved":
          return "Saved"
        case "error":
          return "Save failed"
        default:
          return lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : ""
      }
    }

    if (saveStatus === "idle" && !lastSaved) return null

    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {getStatusIcon()}
        <span>{getStatusText()}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    )
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
          <div className="flex items-center gap-4">
            <SaveStatusIndicator />
            <Button
              onClick={handleAddMcqGroup}
              className="px-6 mx-3 hover:bg-blue-700 py-1 text-white rounded-xl bg-black"
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20">{mcqTemplet.map((item, arrayIndex) => renderMcqComponent(item, arrayIndex))}</div>

      <div className="justify-center flex text-white mt-10">
        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-black px-3 p-1 hover:bg-blue-700 font-semibold rounded-md text-white"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Generate PDF"
          )}
        </Button>
      </div>

      {errorMsg && <div className="text-center text-red-500 mt-4">{errorMsg}</div>}
    </div>
  )
}

export default Mcq

