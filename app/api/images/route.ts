import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    // Fetch images from Cloudinary folder (including GIFs)
    const result = await cloudinary.search
      .expression("folder:free-images")
      .sort_by("created_at", "desc")
      .max_results(100)
      .with_field("context")
      .execute()

    const images = result.resources.map((resource: {
      public_id: string
      secure_url: string
      format: string
      width: number
      height: number
    }) => {
      const isGif = resource.format === "gif"
      
      // For GIFs, use the original URL without any transformations to preserve animation
      // For other images, generate optimized URLs
      const originalUrl = cloudinary.url(resource.public_id, {
        secure: true,
        resource_type: "image",
        format: resource.format,
      })
      
      const downloadUrl = cloudinary.url(resource.public_id, {
        secure: true,
        resource_type: "image",
        format: resource.format,
        flags: "attachment",
      })

      // For GIFs, use secure_url directly (no transformations) to preserve animation
      // For other images, apply f_auto,q_auto for optimal format and quality
      const displayUrl = isGif 
        ? resource.secure_url 
        : cloudinary.url(resource.public_id, {
            secure: true,
            resource_type: "image",
            fetch_format: "auto",
            quality: "auto",
          })

      return {
        id: resource.public_id,
        url: displayUrl,
        originalUrl: originalUrl,
        downloadUrl: downloadUrl,
        name: resource.public_id.split("/").pop() || resource.public_id,
        isGif: isGif,
        format: resource.format,
        width: resource.width,
        height: resource.height,
      }
    })

    return NextResponse.json({ images })

  } catch (error) {
    console.error("Fetch images error:", error)
    return NextResponse.json(
      { error: "Failed to fetch images", images: [] },
      { status: 500 }
    )
  }
}
