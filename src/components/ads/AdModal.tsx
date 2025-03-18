"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createAd, updateAd } from "@/services/ad";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ad } from "@/types";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { VideoUploader } from "@/components/videos/VideoUploader";
import { uploadImage } from "@/utils";
import SwitchField from "../ui/SwitchField";

// Define the form schema using Zod
const adFormSchema = z.object({
  type: z.enum(["image", "video"]),
  mediaUrl: z.string().url("Invalid URL"),
  isActive: z.boolean(),
});

type AdFormValues = z.infer<typeof adFormSchema>;

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  ad?: Ad | null;
}

const AdModal = ({ isOpen, onClose, ad }: AdModalProps) => {
  const queryClient = useQueryClient();

  // Initialize React Hook Form
  const methods = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      type: "image",
      mediaUrl: "",
      isActive: true,
    },
  });

  const { register, handleSubmit, reset, watch, setValue } = methods;

  // Watch the `type` field to dynamically render the appropriate upload component
  const selectedType = watch("type");

  // Mutation for creating/updating an ad
  const mutation = useMutation({
    mutationFn: (data: AdFormValues) =>
      ad ? updateAd({ ...data, _id: ad._id }) : createAd(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] }); // Refresh the ads list
      onClose(); // Close the modal
      reset(); // Reset the form
    },
  });

  // Handle form submission
  const onSubmit = (data: AdFormValues) => {
    mutation.mutate(data);
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const imageUrl = await uploadImage(file); // Upload the image and get the URL
    setValue("mediaUrl", imageUrl); // Set the mediaUrl field with the uploaded image URL
    return imageUrl;
  };

  // Reset form values when the `ad` prop changes
  useEffect(() => {
    if (ad) {
      reset({
        type: ad.type,
        mediaUrl: ad.mediaUrl,
        isActive: ad.isActive,
      });
    } else {
      reset({
        type: "image",
        mediaUrl: "",
        isActive: true,
      });
    }
  }, [ad, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ad ? "Edit Ad" : "Create New Ad"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Type</Label>
              <select
                {...register("type")}
                className="w-full p-2 border rounded"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {/* Render ImageUpload or VideoUploader based on the selected type */}
            {selectedType === "image" ? (
              <ImageUpload
                name="mediaUrl"
                label="Upload Image"
                onUpload={handleImageUpload}
              />
            ) : (
              <VideoUploader
                name="mediaUrl"
                label="Upload Video"
                initialVideoUrl={ad?.mediaUrl}
              />
            )}

            <SwitchField name="isActive" label="Ad Active" />

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AdModal;
