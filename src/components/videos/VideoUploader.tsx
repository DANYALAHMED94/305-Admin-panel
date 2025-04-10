"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";
import { FileVideo, X } from "lucide-react";
import {
  generatePresignedUrl,
  startMultipartUpload,
  generateMultipartUrls,
  completeMultipartUpload,
} from "@/services/upload";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player"; // Import ReactPlayer

interface VideoUploaderProps {
  name: string;
  label: string;
  initialVideoUrl?: string; // Optional initial video URL for edit mode
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  name,
  label,
  initialVideoUrl,
}) => {
  const { control, setValue } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(
    initialVideoUrl || null
  );

  // Sync the initialVideoUrl with the uploadedVideoUrl state
  useEffect(() => {
    if (initialVideoUrl) {
      setUploadedVideoUrl(initialVideoUrl);
      setValue(name, initialVideoUrl);
    }
  }, [initialVideoUrl, name, setValue]);

  const uploadVideo = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        setUploadProgress(0);

        const folder = "video/";
        const fileName = `${folder}${file.name}`;

        // if (file.size < 10 * 1024 * 1024) {
        if (true) {
          // Single-part upload for small files
          const { url } = await generatePresignedUrl(
            fileName,
            "file",
            file.type
          );

          const finalUrl = url.split("?")[0];

          await axios.put(url, file, {
            headers: { "Content-Type": file.type },
            onUploadProgress: (progressEvent) => {
              const total = progressEvent.total ?? 0; // Provide a default
              const progress = Math.round((progressEvent.loaded / total) * 100);
              setUploadProgress((prev) => Math.max(progress, prev));
            },
          });

          setValue(name, finalUrl);
          setUploadedVideoUrl(finalUrl);
          toast.success("Video uploaded successfully!");
        } else {
          // Multipart upload for large files
          const { uploadId } = await startMultipartUpload(
            fileName,
            "file",
            file.type
          );

          const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB chunks
          const numChunks = Math.ceil(file.size / CHUNK_SIZE);

          const { presignedUrls } = await generateMultipartUrls(
            fileName,
            "file",
            uploadId,
            numChunks
          );

          const parts = [];
          let totalUploaded = 0;

          for (let i = 0; i < numChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            const uploadResponse = await axios.put(presignedUrls[i], chunk, {
              headers: { "Content-Type": file.type },
              onUploadProgress: (progressEvent) => {
                const chunkLoaded = progressEvent.loaded;
                totalUploaded += chunkLoaded;
                const overallProgress = Math.round(
                  (totalUploaded / file.size) * 100
                );
                setUploadProgress(overallProgress);
              },
            });

            if (uploadResponse.status === 200) {
              console.log("Here is upload response--->>>", uploadResponse);
              const etag = uploadResponse.headers.etag;
              parts.push({ ETag: etag, PartNumber: i + 1 });
            } else {
              throw new Error(`Chunk ${i + 1} upload failed`);
            }
          }
          console.log("Here is upload data:", parts);

          const completeResponse = await completeMultipartUpload(
            fileName,
            "file",
            uploadId,
            parts
          );

          if (completeResponse) {
            setValue(name, completeResponse.fileData.Location);
            setUploadedVideoUrl(completeResponse.fileData.Location);
            toast.success("Video uploaded successfully!");
          } else {
            throw new Error("Multipart upload completion failed");
          }
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [
      name,
      setValue,
      generatePresignedUrl,
      startMultipartUpload,
      generateMultipartUrls,
      completeMultipartUpload,
    ]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("video/")) {
        uploadVideo(file);
      } else {
        toast.error("Please upload a video file.");
      }
    },
    [uploadVideo]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    multiple: false,
    disabled: isUploading,
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      uploadVideo(file);
    } else if (file) {
      toast.error("Please upload a video file.");
    }
  };

  const handleRemoveVideo = () => {
    setUploadedVideoUrl(null);
    setValue(name, null);
    toast.success("Video removed successfully!");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={() => (
          <div className="flex flex-col gap-4">
            {!uploadedVideoUrl ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  {...getInputProps({
                    onChange: handleFileInputChange,
                    disabled: isUploading,
                  })}
                />
                {isDragActive ? (
                  <p className="text-blue-500">Drop the video here...</p>
                ) : (
                  <>
                    <FileVideo size={48} className="text-gray-500 mb-2" />
                    <p className="text-gray-700">
                      Drag 'n' drop a video here, or click to select a file
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      (Only video files will be accepted)
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="relative">
                {/* ReactPlayer to display the video */}
                <ReactPlayer
                  url={uploadedVideoUrl}
                  controls
                  width="100%"
                  height="auto"
                />
                {/* Cross button to remove the video */}
                <button
                  onClick={handleRemoveVideo}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={16} className="text-gray-700" />
                </button>
              </div>
            )}

            {isUploading && <Progress value={uploadProgress} className="h-2" />}
          </div>
        )}
      />
    </div>
  );
};
