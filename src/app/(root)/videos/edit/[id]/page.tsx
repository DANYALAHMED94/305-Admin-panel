"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import TagInput from "@/components/ui/TagInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideoById, updateVideo } from "@/services/video";
import { useRouter, useParams } from "next/navigation";
import { uploadImage } from "@/utils";
import TimeInput from "@/components/ui/TimeInput";
import SwitchField from "@/components/ui/SwitchField";
import DatePickerField from "@/components/ui/DatePickerField";
import { getAllTeams } from "@/services/team";
import TeamSelect from "@/components/ui/TeamSelect";
import LoadingBall from "@/components/global/LoadingBall";
import { useEffect } from "react";
import CategorySelector from "@/components/ui/CategorySelector";
import { videoFormSchema, VideoFormValues } from "@/schemas";

export default function EditVideoPage() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch existing video data
  const { data: videoData, isLoading } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id as string),
    enabled: !!id, // Only run if ID exists
  });

  // Fetch teams
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  const methods = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: "",
      videoUrl: "",
      length: 0,
      videoEnabled: true,
      monetizationEnabled: false,
      adsEnabled: false,
      specifyTeams: false,
      thumbnail: "",
      shortDescription: "",
      category: "",
      tags: [],
      releaseDate: undefined,
      teamId: [],
    },
  });

  // Reset form with fetched video data
  useEffect(() => {
    if (videoData) {
      methods.reset({
        ...videoData,
        releaseDate: videoData.releaseDate
          ? new Date(videoData.releaseDate)
          : undefined,
        teamId: videoData.teamId || [],
      });
    }
  }, [videoData, methods]);

  const mutation = useMutation({
    mutationFn: (data: VideoFormValues) => updateVideo(id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video", id] });
      router.push("/videos"); // Redirect to videos page after update
    },
    onError: (error) => {
      console.error("Error updating video:", error);
    },
  });

  const onSubmit = (data: VideoFormValues) => {
    mutation.mutate(data);
  };

  const specifyTeams = methods.watch("specifyTeams");

  if (isLoading) return <LoadingBall />;

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
        <h1 className="text-2xl font-bold mb-6">Edit Recorded Video</h1>
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
            {/* <CategoryTree name="category" label="Category" /> */}
            <CategorySelector name="category" label="Category" />
            <TagInput
              name="tags"
              label="Tags"
              placeholder="Type and press Enter to add tags"
            />
            <SwitchField name="videoEnabled" label="Video Enabled" />
            <DatePickerField name="releaseDate" label="Release Date" />

            <SwitchField name="specifyTeams" label="Wanna Specify Teams?" />
            {specifyTeams && teams && (
              <TeamSelect name="teamId" label="Select Teams" teams={teams} />
            )}

            <SwitchField
              name="monetizationEnabled"
              label="Monetization Enabled"
            />
            <SwitchField name="adsEnabled" label="Ads Enabled" />

            <Button
              className="w-full py-5 text-xl mt-12"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
