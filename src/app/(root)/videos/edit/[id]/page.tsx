"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
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
import { VideoUploader } from "@/components/videos/VideoUploader";
import { AdSelector } from "@/components/videos/AdSelector"; // Import AdSelector

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
      adCount: 0, // Initialize adCount
      ads: [], // Initialize ads array
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "ads",
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
        adCount: videoData.ads?.length || 0, // Initialize adCount from existing data
        ads: videoData.ads || [], // Initialize ads array from existing data
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
  const adsEnabled = methods.watch("adsEnabled");
  const adCount = methods.watch("adCount");
  const videoLength = methods.watch("length");

  useEffect(() => {
    const currentLength = fields.length;
    if (adCount === undefined) {
      methods.setValue("ads", []);
      return;
    }
    if (adCount > currentLength) {
      // Add missing ads
      for (let i = currentLength; i < adCount; i++) {
        append({ ad: "", startTime: "" });
      }
    } else if (adCount < currentLength) {
      // Remove extra ads
      for (let i = currentLength - 1; i >= adCount; i--) {
        remove(i);
      }
    }
  }, [adCount, fields.length, append, remove]);

  if (isLoading) return <LoadingBall />;

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
        <h1 className="text-2xl font-bold mb-6">Edit Recorded Video</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, (errors) => {
              console.log("Form errors:", errors); // Log validation errors
            })}
            className="space-y-6"
          >
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
            <VideoUploader
              name="videoUrl"
              label="Video URL"
              initialVideoUrl={videoData?.videoUrl}
            />
            <TimeInput
              name="length"
              label="Video Length (HH:MM:SS or MM:SS)"
              placeholder="Enter video length"
            />
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

            {/* Ads Section */}
            {adsEnabled && (
              <div className="space-y-6">
                <FormInput
                  name="adCount"
                  label="Number of Ads"
                  type="number"
                  onChange={(e) =>
                    methods.setValue("adCount", parseInt(e.target.value || "0"))
                  } // Ensure it's always a number
                />
                {Array.from({ length: adCount || 0 }).map((_, index) => (
                  <AdSelector
                    key={index}
                    index={index}
                    control={methods.control}
                    videoLength={videoLength}
                  />
                ))}
              </div>
            )}

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
