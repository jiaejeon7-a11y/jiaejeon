"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"
import Image from "next/image"

type ImageItem = {
  id: string
  url: string
  originalUrl?: string
  downloadUrl?: string
  name: string
  isGif?: boolean
  format?: string
}

export default function FreeImagesPage() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState<string>("Uploading...")
  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<ImageItem[]>([])
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  // Fetch images from Cloudinary on page load
  const fetchImages = async () => {
    try {
      const response = await fetch("/api/images")
      const data = await response.json()
      if (data.images) {
        setImages(data.images)
      }
    } catch (err) {
      console.error("Failed to fetch images:", err)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Convert HEIC/HEIF to JPEG
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    return file;
  };

  // Compress image to WebP format
  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        // Max dimensions for compression
        const maxWidth = 1920
        const maxHeight = 1920

        let { width, height } = img

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("Failed to compress image"))
            }
          },
          "image/webp",
          0.85
        )
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = URL.createObjectURL(file)
    })
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    setProgress(0)
    setStatusMessage("Uploading...")
    setError(null)

    try {
      const formData = new FormData()
      // 서버를 거치지 않고 Cloudinary로 직접 쏩니다.
      formData.append("file", file)
      formData.append("upload_preset", "ml_default")
      formData.append("folder", "free-images")
      formData.append("cloud_name", "dibngz05a")

      const xhr = new XMLHttpRequest()

      // 업로드 진행률 업데이트
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100)
          setProgress(percentComplete)
        }
      })

      // 업로드 완료 후 동작
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          fetchImages()
          setTimeout(() => {
            setUploading(false)
            setShowUploadModal(false)
            setShowModal(true)
          }, 500)
        } else {
          setError("Cloudinary 업로드 실패. 설정을 확인하세요.")
          setUploading(false)
        }
      })

      // 에러 처리
      xhr.addEventListener("error", () => {
        setError("네트워크 오류가 발생했습니다.")
        setUploading(false)
      })

      // Cloudinary 서버 주소로 직접 전송!
      xhr.open("POST", "https://api.cloudinary.com/v1_1/dibngz05a/image/upload")
      xhr.send(formData)

    } catch (err) {
      console.error("Upload Error:", err)
      setError("업로드 중 오류 발생")
      setUploading(false)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/heic": [".heic"],
      "image/heif": [".heif"],
      "image/gif": [".gif"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: uploading,
  })

  const handleModalClick = () => {
    setShowModal(false)
    setProgress(0)
  }

  const handleUploadModalClose = () => {
    if (!uploading) {
      setShowUploadModal(false)
      setError(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#51accc] font-serif">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-6">
        {/* Back Button - Text */}
        <Link
          href="/"
          className="text-sm text-white hover:text-white/80 transition-colors"
        >
          Back
        </Link>

        {/* Upload Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="text-sm text-white hover:text-white/80 transition-colors"
        >
          upload
        </button>
      </header>

      {/* Main Content - Image Feed */}
      <main className="pt-20">
        {images.length > 0 ? (
          <div className="flex flex-wrap">
            {images.map((image) => (
              // 1. URL이 .gif로 끝나거나 isGif 값이 참인 경우를 모두 체크합니다.
              (image.isGif || image.url.toLowerCase().endsWith('.gif')) ? (
                <img
                  key={image.id}
                  src={image.url} // [핵심] 최적화 옵션을 다 빼고 원본을 써야 무한 루핑됩니다.
                  alt={image.name}
                  className="h-32 lg:h-48 w-auto flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                />
              ) : (
                <Image
                  key={image.id}
                  src={image.url.replace('/upload/', '/upload/f_auto,q_auto/')}
                  alt={image.name}
                  width={400}
                  height={400}
                  className="h-32 lg:h-48 w-auto flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                />
              )
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-white/60 text-sm">No images yet. Click upload to add images.</p>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleUploadModalClose}
        >
          <div
            className="bg-white p-8 max-w-md mx-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`w-full border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragActive
                ? "border-gray-700 bg-gray-50"
                : "border-gray-300 hover:border-gray-500"
                } ${uploading ? "pointer-events-none opacity-50" : ""}`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{statusMessage}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#51accc] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{progress}%</p>
                </div>
              ) : isDragActive ? (
                <p className="text-sm text-gray-600">Drop the image here...</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Drag and drop an image here, or click to select
                  </p>
                  <p className="text-xs text-gray-400">
                    JPG, PNG, GIF, HEIC, HEIF (max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Info Text */}
            <p className="mt-6 text-xs text-gray-400 text-center">
              By uploading, you agree that all images may be used freely by anyone without copyright restrictions.
            </p>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {selectedImage.isGif ? (
              <img
                src={(selectedImage.originalUrl || selectedImage.url).replace('/upload/', '/upload/f_auto,q_auto/')}
                alt={selectedImage.name}
                className="max-w-full max-h-[80vh] object-contain"
              />
            ) : (
              <img
                src={(selectedImage.originalUrl || selectedImage.url).replace('/upload/', '/upload/f_auto,q_auto/')}
                alt={selectedImage.name}
                className="max-w-full max-h-[80vh] object-contain"
              />
            )}

            {/* Download Button */}
            <button
              onClick={async (e) => {
                e.stopPropagation(); // 모달 닫히는 거 방지
                try {
                  // 스크린샷에 있는 selectedImage 변수를 그대로 사용합니다.
                  const url = selectedImage.downloadUrl || selectedImage.url;
                  const response = await fetch(url);
                  const blob = await response.blob();
                  const blobUrl = window.URL.createObjectURL(blob);

                  const link = document.createElement('a');
                  link.href = blobUrl;
                  // 파일명 설정
                  link.download = `${selectedImage.name || 'image'}.${selectedImage.format || 'jpg'}`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(blobUrl);
                } catch (err) {
                  // 에러 시 최후의 보루: 새 창에서 열기
                  window.open(selectedImage.downloadUrl || selectedImage.url, '_blank');
                }
              }}
              className="mt-4 px-6 py-2 bg-white text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors rounded-md text-center"
            >
              Download
            </button>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer"
          onClick={handleModalClick}
        >
          <div className="bg-white p-8 max-w-md mx-4 text-center">
            <p className="text-sm text-gray-700 leading-relaxed">
              Thank you. You agree that all images you upload may be used freely by anyone without copyright restrictions, including for commercial use and modification.
            </p>
            <p className="mt-4 text-xs text-gray-400">
              Click anywhere to continue
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
