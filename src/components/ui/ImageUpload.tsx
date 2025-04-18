"use client";

import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  name: string;
  label: string;
  onUpload: (file: File) => Promise<string>;
  required?: boolean;
}

export const ImageUpload = ({
  name,
  label,
  onUpload,
  required = false,
}: ImageUploadProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const thumbnailUrl = watch(name);

  // Allowed image types (excluding SVG)
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  const validateImageType = (file: File): boolean => {
    return allowedTypes.includes(file.type);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        if (!validateImageType(file)) {
          toast.error("Only JPG, PNG, GIF, or WEBP images are allowed");
          return;
        }
        setIsUploading(true);
        try {
          const url = await onUpload(file);
          setValue(name, url, { shouldValidate: true });
        } catch (error) {
          toast.error("Failed to upload image");
        } finally {
          setIsUploading(false);
        }
      }
    },
    [name, onUpload, setValue]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateImageType(file)) {
        toast.error("Only JPG, PNG, GIF, or WEBP images are allowed");
        return;
      }
      setIsUploading(true);
      try {
        const url = await onUpload(file);
        setValue(name, url, { shouldValidate: true });
      } catch (error) {
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {thumbnailUrl ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt="Thumbnail"
            className="w-full h-full object-contain"
            width={400}
            height={300}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors",
            errors[name]
              ? "border-red-500"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Drag & drop an image (JPG, PNG, GIF, WEBP) or{" "}
            <label
              htmlFor="file-upload"
              className="text-blue-600 cursor-pointer hover:underline"
            >
              browse
            </label>
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
      {isUploading && (
        <p className="text-sm text-gray-500">Uploading image...</p>
      )}
    </div>
  );
};
