
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/ui/FormInput"
import { FormTextarea } from "@/components/ui/FormTextarea"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createRecordedVideo } from "@/services/video"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/utils"
import TimeInput from "@/components/ui/TimeInput"
import SwitchField from "@/components/ui/SwitchField"
import DatePickerField from "@/components/ui/DatePickerField"
import { getAllTeams } from "@/services/team"
import TeamSelect from "@/components/ui/TeamSelect"
import CategorySelector from "@/components/ui/CategorySelector"
import { videoFormSchema, type VideoFormValues } from "@/schemas"
import { VideoUploader } from "@/components/videos/VideoUploader"
import { AdSelector } from "@/components/videos/AdSelector"
import { useEffect } from "react"
import CustomLabelSelector from "@/components/videos/CustomLabelSelector"
import { toast } from "react-hot-toast"

export default function AddVideoPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const methods = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      videoEnabled: true,
      monetizationEnabled: false,
      customLabels: [],
      adsEnabled: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "ads",
  })

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  })

  const mutation = useMutation({
    mutationFn: createRecordedVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
      router.push("/videos")
      toast.success("Video created successfully!")
    },
    onError: (error) => {
      console.error("Error creating video:", error)
      toast.error("Failed to create video. Please try again.")
    },
  })

  const onSubmit = async (data: VideoFormValues) => {
    if (!data.thumbnail) {
      methods.setError("thumbnail", {
        type: "manual",
        message: "Thumbnail is required",
      })
      toast.error("Please upload a thumbnail")
      return
    }
    
    if (!data.category) {
            methods.setError("category", {
              type: "manual",
              message: "Category is required",
            });
            toast.error("Please select a category");
            return;
          }

 
    mutation.mutate(data)
  }

  const specifyTeams = methods.watch("specifyTeams")
  const adsEnabled = methods.watch("adsEnabled")
  const adCount = methods.watch("adCount")
  const videoLength = methods.watch("length")

  const handleDurationExtracted = (duration: number) => {
    methods.setValue("length", duration, { shouldValidate: true })
  }

  useEffect(() => {
    const currentLength = fields.length
    if (adCount === undefined) {
      methods.setValue("ads", [])
      return
    }
    if (adCount > currentLength) {
      for (let i = currentLength; i < adCount; i++) {
        append({ ad: "", startTime: "" })
      }
    } else if (adCount < currentLength) {
      for (let i = currentLength - 1; i >= adCount; i--) {
        remove(i)
      }
    }
  }, [adCount, fields.length, append, remove, methods])

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
        <h1 className="text-2xl font-bold mb-6">Add Recorded Video</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
                e.preventDefault()
              }
            }}
          >
            <FormInput name="title" label="Title" placeholder="Enter video title" required />

            <ImageUpload name="thumbnail" label="Thumbnail" onUpload={uploadImage} required />

            <FormTextarea name="shortDescription" label="Short Description" placeholder="Enter a short description" />

            <VideoUploader name="videoUrl" label="Video URL" required onDurationExtracted={handleDurationExtracted} />

            <TimeInput name="length" label="Video Length (HH:MM:SS or MM:SS)" placeholder="Enter video length" />

            <CategorySelector
              name="category"
              label="Sub-Category" // Updated label to be more specific
              required
            />

            <CustomLabelSelector name="customLabels" label="Custom Labels" placeholder="Select custom labels..." />

            <SwitchField name="videoEnabled" label="Video Enabled" />

            <DatePickerField name="releaseDate" label="Release Date" />

            <SwitchField name="specifyTeams" label="Wanna Specify Teams?" />

            {specifyTeams && teams && <TeamSelect name="teamId" label="Select Teams" teams={teams} />}

            <SwitchField name="monetizationEnabled" label="Monetization Enabled" />

            <SwitchField name="adsEnabled" label="Ads Enabled" />

            {adsEnabled && (
              <div className="space-y-6">
                <FormInput name="adCount" label="Number of Ads" type="number" min={0} />
                {Array.from({ length: adCount || 0 }).map((_, index) => (
                  <AdSelector key={index} index={index} control={methods.control} videoLength={videoLength} />
                ))}
              </div>
            )}
            <Button
              className="w-full py-5 text-xl mt-12 cursor-pointer"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
