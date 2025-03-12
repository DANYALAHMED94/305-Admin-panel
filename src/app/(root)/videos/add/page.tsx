"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import TagInput from "@/components/ui/TagInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecordedVideo } from "@/services/video";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils";
import TimeInput from "@/components/ui/TimeInput";
import SwitchField from "@/components/ui/SwitchField";
import DatePickerField from "@/components/ui/DatePickerField";
import { getAllTeams } from "@/services/team";
import TeamSelect from "@/components/ui/TeamSelect";
import CategorySelector from "@/components/ui/CategorySelector";
import { videoFormSchema, VideoFormValues } from "@/schemas";
import { VideoUploader } from "@/components/videos/VideoUploader";

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

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams, // Replace with your fetch function
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

  const specifyTeams = methods.watch("specifyTeams");

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
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
            {/* <FormInput
              name="videoUrl"
              label="Video URL"
              placeholder="Enter video URL"
            /> */}
            <VideoUploader name="videoUrl" label="Video URL" />
            <TimeInput
              name="length"
              label="Video Length (HH:MM:SS or MM:SS)"
              placeholder="Enter video length"
            />
            {/* <CategoryTree name="category" label="Category" /> */}
            <CategorySelector name="category" label="Category" />
            <TagInput
              name="tags"
              label="Tags"
              placeholder="Type and press Enter to add tags"
            />
            {/* Video Enabled */}
            <SwitchField name="videoEnabled" label="Video Enabled" />

            {/* Release Date */}
            <DatePickerField name="releaseDate" label="Release Date" />

            {/* Specify Teams Switch */}
            <SwitchField name="specifyTeams" label="Wanna Specify Teams?" />

            {/* Team Selection (Conditional) */}
            {specifyTeams && teams && (
              <TeamSelect name="teamId" label="Select Teams" teams={teams} />
            )}

            {/* Monetization Enabled */}
            <SwitchField
              name="monetizationEnabled"
              label="Monetization Enabled"
            />

            {/* Ads Enabled */}
            <SwitchField name="adsEnabled" label="Ads Enabled" />
            <Button
              className="w-full py-5 text-xl mt-12"
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
