'use client'
import { useState, useRef } from 'react'
type props = {
  imgFor:string
}
export default function ImageDropzone( {imgFor} : props ) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
        <label
          className={
            `items-center max-w-md border-4 border-dashed rounded-lg
            cursor-pointer`}
        >
          <p className="text-sm text-black bg-amber-50 p-1">{imgFor} IMG (up to 5 MB)</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            height="300px"
            className="max-w-md max-h-60 mb-2 rounded-md border"
          />
        )}        

    </div>
  )
}
