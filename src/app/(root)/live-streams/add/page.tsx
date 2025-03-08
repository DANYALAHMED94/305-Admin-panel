"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import TagInput from "@/components/ui/TagInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLiveVideo } from "@/services/video";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils";
import SwitchField from "@/components/ui/SwitchField";
import { getAllTeams } from "@/services/team";
import TeamSelect from "@/components/ui/TeamSelect";
import CategorySelector from "@/components/ui/CategorySelector";
import { DateTimePickerField } from "@/components/ui/DateTimePickerField"; // Add a DateTimePicker component
import { liveStreamFormSchema, LiveStreamFormValues } from "@/schemas";

export default function AddLiveStreamPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<LiveStreamFormValues>({
    resolver: zodResolver(liveStreamFormSchema),
    defaultValues: {
      videoEnabled: true,
      monetizationEnabled: false,
      adsEnabled: false,
    },
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams, // Fetch all teams
  });

  const mutation = useMutation({
    mutationFn: createLiveVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["live-streams"] });
      router.push("/live-streams");
    },
    onError: (error) => {
      console.error("Error creating live stream:", error);
    },
  });

  const onSubmit = (data: LiveStreamFormValues) => {
    // Convert startDateTime from string to Date
    const liveStreamData = {
      ...data,
      startDateTime: new Date(data.startDateTime),
    };
    mutation.mutate(liveStreamData);
  };

  const specifyTeams = methods.watch("specifyTeams");

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
        <h1 className="text-2xl font-bold mb-6">Add Live Stream</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="title"
              label="Title"
              placeholder="Enter live stream title"
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
              placeholder="Enter live stream URL"
            />
            {/* Start Date & Time */}
            <DateTimePickerField
              name="startDateTime"
              label="Start Date & Time"
            />
            <CategorySelector name="category" label="Category" />
            <TagInput
              name="tags"
              label="Tags"
              placeholder="Type and press Enter to add tags"
            />
            {/* Video Enabled */}
            <SwitchField name="videoEnabled" label="Video Enabled" />
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
              {mutation.isPending ? "Creating..." : "Create Live Stream"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
