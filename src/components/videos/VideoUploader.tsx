
"use client"
import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { toast } from "react-hot-toast"
import { FileVideo, X } from "lucide-react"
import { generatePresignedUrl } from "@/services/upload"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import ReactPlayer from "react-player"

interface VideoUploaderProps {
  name: string
  label: string
  initialVideoUrl?: string
  required?: boolean
  onDurationExtracted?: (duration: number) => void
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  name,
  label,
  initialVideoUrl,
  required = false,
  onDurationExtracted,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(initialVideoUrl || null)

  // Sync the initialVideoUrl with the uploadedVideoUrl state
  useEffect(() => {
    if (initialVideoUrl) {
      setUploadedVideoUrl(initialVideoUrl)
      setValue(name, initialVideoUrl, { shouldValidate: true })
    }
  }, [initialVideoUrl, name, setValue])

  const handleDuration = (duration: number) => {
    if (onDurationExtracted) {
      onDurationExtracted(Math.floor(duration))
    }
  }

  // Function to validate video file format
  const validateVideoFormat = (file: File): boolean => {
    // Extract file extension
    const fileName = file.name.toLowerCase()
    const fileExtension = fileName.split(".").pop()

    // Check if the file is mp4 or m3u8
    const isValidFormat = fileExtension === "mp4" || fileExtension === "m3u8"

    if (!isValidFormat) {
      toast.error("Only MP4 or M3U8 video formats are allowed.")
    }

    return isValidFormat
  }

  const uploadVideo = useCallback(
    async (file: File) => {
      // Validate video format before uploading
      if (!validateVideoFormat(file)) {
        return
      }

      try {
        setIsUploading(true)
        setUploadProgress(0)

        const folder = "video/"
        const fileName = `${folder}${file.name}`

        // Single-part upload
        const { url } = await generatePresignedUrl(fileName, "file", file.type)
        const finalUrl = url.split("?")[0]

        await axios.put(url, file, {
          headers: { "Content-Type": file.type },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total ?? 0
            const progress = Math.round((progressEvent.loaded / total) * 100)
            setUploadProgress((prev) => Math.max(progress, prev))
          },
        })

        setValue(name, finalUrl, { shouldValidate: true })
        setUploadedVideoUrl(finalUrl)
        trigger(name) // Trigger validation after upload
      } catch (error) {
        console.error("Upload failed:", error)
        toast.error("Upload failed. Please try again.")
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [name, setValue, trigger],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file && file.type.startsWith("video/")) {
          uploadVideo(file)
        } else {
          toast.error("Please upload a valid video file.")
        }
      },
      [uploadVideo],
    ),
    accept: {
      // Updated to only accept mp4 and m3u8 formats
      "video/*": [".mp4", ".m3u8"],
    },
    multiple: false,
    disabled: isUploading,
  })

  const handleRemoveVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setUploadedVideoUrl(null)
    setValue(name, "", { shouldValidate: true })
    trigger(name) // Trigger validation after removal
  }

  // Prevent default form submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <div className="space-y-2" onKeyDown={handleKeyDown}>
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ fieldState }) => (
          <div className="flex flex-col gap-4">
            {!uploadedVideoUrl ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${
                  fieldState.error ? "border-red-500" : isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <input
                  {...getInputProps({
                    id: name,
                    disabled: isUploading,
                  })}
                />
                {isDragActive ? (
                  <p className="text-blue-500">Drop the video here...</p>
                ) : (
                  <>
                    <FileVideo size={48} className="text-gray-500 mb-2" />
                    <p className="text-gray-700">Drag 'n' drop a video here, or click to select a file</p>
                    <p className="text-gray-500 text-sm mt-1">(Only MP4 or M3U8 video formats are accepted)</p>
                  </>
                )}
              </div>
            ) : (
              <div className="relative">
                <ReactPlayer url={uploadedVideoUrl} controls width="100%" height="auto" onDuration={handleDuration} />
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={16} className="text-gray-700" />
                </button>
              </div>
            )}

            {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}

            {isUploading && <Progress value={uploadProgress} className="h-2" />}
          </div>
        )}
      />
    </div>
  )
}
