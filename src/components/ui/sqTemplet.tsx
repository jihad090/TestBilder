


"use client"

import type React from "react"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import ImageDropzone from "@/components/ImageDropzone"

type DelBtnProps = {
  pIdx: number
  onDelete: () => void
}

export const DelBtnSQ = ({ onDelete }: DelBtnProps) => (
  <button
    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 text-sm rounded-xl"
    onClick={onDelete}
    type="button"
  >
    Delete SQ
  </button>
)

type SqTempletProps = {
  value: string
  marks?: number
  image?: string
  onImageChange: (imgPath: string) => void
  onChange: (value: string) => void
  children: React.ReactNode
}

export const SqTemplet = ({ value, marks = 2, image, onImageChange, onChange, children }: SqTempletProps) => {
  return (
    <div className="mx-auto max-w-2xl p-3 bg-blue-100 rounded-2xl">
      <div className="flex justify-between">
        <div className="w-full">
          <Label htmlFor="question-input">প্রশ্ন (Question)</Label>
          <Input
            id="question-input"
            placeholder="প্রশ্ন লিখুন (Write question)"
            type="text"
            className="w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="marks-input">নম্বর (Marks)</Label>
          <Input
            id="marks-input"
            placeholder="নম্বর"
            type="number"
            className="w-20"
            defaultValue={marks}
            readOnly
          />
        </div>
      </div>
      <ImageDropzone imgFor="Question" image={image} onImageChange={onImageChange} />
      <div className="flex justify-end mt-2">{children}</div>
    </div>
  )
}
