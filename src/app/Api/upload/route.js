



import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request) {
  try {
    const data = await request.formData()
    const file = data.get("image")

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const filepath = join(process.cwd(), "public/uploads", filename)

    // Ensure upload directory exists
    const { mkdir } = await import("fs/promises")
    const uploadDir = join(process.cwd(), "public/uploads")

    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Write file
    await writeFile(filepath, buffer)

    return NextResponse.json({
      success: true,
      fileUrl: `/uploads/${filename}`,
      fileName: filename,
      fileSize: file.size,
      fileType: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
