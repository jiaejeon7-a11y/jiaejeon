import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("id")
    const format = searchParams.get("format") || "jpg"

    if (!publicId) {
      return NextResponse.json({ error: "Missing image ID" }, { status: 400 })
    }

    // Generate the original quality URL
    const imageUrl = cloudinary.url(publicId, {
      secure: true,
      resource_type: "image",
      format: format,
    })

    // Fetch the image from Cloudinary
    const imageResponse = await fetch(imageUrl)
    
    if (!imageResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    const fileName = publicId.split("/").pop() || "image"

    // Return the image with download headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="${fileName}.${format}"`,
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
