"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ExamType = "mcq" | "cq" | "sq" | "all"

type TemplateItem = {
  _id: string
  examType: ExamType
  createdAt: string
  updatedAt: string
  questionsCount: number
  isComplete: boolean
  sqGroup?: { isComplete: boolean }
  primaryInfo: {
    _id: string // Add this line
    subject: string
    institutionName: string
    examName: string
    class: string
    totalMark: number
  }
}

export default function IncompleteTemplateTable() {
  const [templateList, setTemplateList] = useState<TemplateItem[]>([])
  const [filterType, setFilterType] = useState<ExamType>("all")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId")
      if (storedUserId) {
        setUserId(storedUserId)
      }
    }
  }, [])

  useEffect(() => {
    if (userId) {
      fetchTemplates(userId)
    }
  }, [userId])

  const fetchTemplates = async (userId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/Api/complete?userId=${userId}`)
      const data = await res.json()
      if (data.success) {
        const incompleted = data.data.filter((t: TemplateItem) =>
          t.examType === "sq" ? t.sqGroup?.isComplete === false : t.isComplete === false,
        )
        setTemplateList(incompleted)
      }
    } catch (error) {
      console.error("Failed to fetch templates", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (templateId: string, examType: ExamType) => {
    if (!userId) return
    const confirm = window.confirm("Are you sure you want to delete this template?")
    if (!confirm) return
    try {
      const res = await fetch("/Api/complete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, userId, examType }),
      })
      const result = await res.json()
      if (result.success) {
        setTemplateList((prev) => prev.filter((t) => t._id !== templateId))
      } else {
        alert("Delete failed: " + result.message)
      }
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  // New handleEdit function
  const handleEdit = (templateId: string, examType: ExamType, primaryInfoId: string) => {
    let path = ""
    switch (examType) {
      case "sq":
        path = `/questionMakingCorner/sq?templateId=${templateId}&primaryId=${primaryInfoId}`
        break
      case "mcq":
        path = `/questionMakingCorner/mcq?templateId=${templateId}&primaryId=${primaryInfoId}`
        break
      case "cq":
        path = `/questionMakingCorner/cq?templateId=${templateId}&primaryId=${primaryInfoId}`
        break
      default:
        console.warn("Unknown exam type for edit:", examType)
        return
    }
    router.push(path)
  }

  const filteredTemplates =
    filterType === "all" ? templateList : templateList.filter((item) => item.examType === filterType)

  return (
    <div className="p-4">
      <p className="text-3xl text-center bg-white mb-4">Incomplete Questions</p>
      <div className="flex justify-center mb-4">
        <Select onValueChange={(value: ExamType) => setFilterType(value)} value={filterType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Question Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="mcq">MCQ</SelectItem>
            <SelectItem value="cq">CQ</SelectItem>
            <SelectItem value="sq">SQ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[75vh]">
        <Table>
          <TableCaption>A list of your incomplete question templates.</TableCaption>
          <TableHeader className="sticky top-0 bg-blue-100 z-10">
            <TableRow>
              <TableHead>SL No</TableHead>
              <TableHead>Question Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredTemplates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredTemplates.map((item, idx) => (
                <TableRow key={item._id} className="bg-red-100 border-4">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="capitalize">{item.examType}</TableCell>
                  <TableCell>{item.primaryInfo.subject}</TableCell>
                  <TableCell>{item.primaryInfo.institutionName}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(item._id, item.examType, item.primaryInfo._id)} // Pass primaryInfo._id
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 text-red-600 hover:underline"
                      onClick={() => handleDelete(item._id, item.examType)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Total Questions: {filteredTemplates.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
  )
}
