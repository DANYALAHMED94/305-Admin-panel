"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import CategoryTree from "@/components/ui/CategoryTree";
import TagInput from "@/components/ui/TagInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecordedVideo } from "@/services/video";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils";
import TimeInput from "@/components/ui/TimeInput";
import SwitchField from "@/components/ui/SwitchField";
import DatePickerField from "@/components/ui/DatePickerField";

// Define the form schema using Zod
const videoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().optional(),
  shortDescription: z.string().optional(),
  videoUrl: z.string().min(1, "Video URL is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  length: z.number().min(1, "Video length must be at least 1 second"),
  videoEnabled: z.boolean().default(true),
  releaseDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  monetizationEnabled: z.boolean().default(false),
  adsEnabled: z.boolean().default(false),
});

type VideoFormValues = z.infer<typeof videoFormSchema>;

export default function AddVideoPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      videoEnabled: true,
      monetizationEnabled: false,
      adsEnabled: false,
    },
  });

  const mutation = useMutation({
    mutationFn: createRecordedVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      router.push("/videos");
    },
    onError: (error) => {
      console.error("Error creating video:", error);
    },
  });

  const onSubmit = (data: VideoFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Recorded Video</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="title"
              label="Title"
              placeholder="Enter video title"
            />
            <ImageUpload
              name="thumbnail"
              label="Thumbnail"
              onUpload={uploadImage}
            />
            <FormTextarea
              name="shortDescription"
              label="Short Description"
              placeholder="Enter a short description"
            />
            <FormInput
              name="videoUrl"
              label="Video URL"
              placeholder="Enter video URL"
            />
            <TimeInput
              name="length"
              label="Video Length (HH:MM:SS or MM:SS)"
              placeholder="Enter video length"
            />
            <CategoryTree name="category" label="Category" />
            <TagInput
              name="tags"
              label="Tags"
              placeholder="Type and press Enter to add tags"
            />
            {/* Video Enabled */}
            <SwitchField name="videoEnabled" label="Video Enabled" />

            {/* Release Date */}
            <DatePickerField name="releaseDate" label="Release Date" />

            {/* Monetization Enabled */}
            <SwitchField
              name="monetizationEnabled"
              label="Monetization Enabled"
            />

            {/* Ads Enabled */}
            <SwitchField name="adsEnabled" label="Ads Enabled" />
            <Button
              className="w-full py-5 text-xl"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
