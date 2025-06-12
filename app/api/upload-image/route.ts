import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Starting image upload to Vercel Blob...")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("❌ No file provided in request")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("📁 File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    })

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      console.error("❌ File is not an image:", file.type)
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("❌ BLOB_READ_WRITE_TOKEN not found in environment variables")
      return NextResponse.json({ error: "Blob storage not configured" }, { status: 500 })
    }

    console.log("🔑 BLOB_READ_WRITE_TOKEN found")

    // Generate a unique filename to avoid conflicts
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop() || "jpg"
    const uniqueFilename = `trade-${timestamp}-${randomString}.${fileExtension}`

    console.log("📤 Uploading to Vercel Blob with filename:", uniqueFilename)

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
      contentType: file.type,
    })

    console.log("✅ Upload successful:", blob.url)

    // Return the URL of the uploaded image
    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: uniqueFilename,
    })
  } catch (error) {
    console.error("💥 Error uploading image:", error)

    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
