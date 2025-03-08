"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Banner } from "@/types";
import { createBanner, updateBanner } from "@/services/banner";
import { Button } from "@/components/ui/button";
import VideoDropdown from "@/components/banners/VideoDropdown";
import { ImageUpload } from "@/components/ui/ImageUpload"; // Import the ImageUpload component
import { uploadImage } from "@/utils"; // Import the uploadImage helper function
import { Label } from "@/components/ui/label"; // Import the Label component
import ReactSwitch from "react-switch"; // Import the ReactSwitch component

interface BannerFormProps {
  banner?: Banner; // For updating an existing banner
  onSuccess?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner, onSuccess }) => {
  const methods = useForm<Banner>({
    defaultValues: {
      isActive: false, // Default value for isActive
    },
  });
  const [videoId, setVideoId] = useState(banner?.videoId || "");

  const onSubmit: SubmitHandler<Banner> = async (data) => {
    try {
      if (banner) {
        // console.log("Here is data", { ...data, _id: banner._id, videoId });
        // return;
        await updateBanner({ ...data, _id: banner._id, videoId });
      } else {
        await createBanner({ ...data, videoId });
      }
      onSuccess?.();
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  useEffect(() => {
    // If banner exists, reset the form with the banner data
    if (banner) {
      methods.reset({
        ...banner,
        isActive: banner.isActive || false,
      });
      setVideoId(banner.videoId);
    }
  }, [banner, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {/* Replace the Input field with the ImageUpload component */}
        <ImageUpload
          name="imageUrl"
          label="Banner Image"
          onUpload={uploadImage} // Pass the uploadImage helper function
        />
        <VideoDropdown onSelect={(id) => setVideoId(id)} videoId={videoId} />

        {/* Add the isActive toggle switch using react-switch */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="isActive">Activate Banner</Label>
          <ReactSwitch
            id="isActive"
            checked={methods.watch("isActive")} // Use react-hook-form's watch to get the current value
            onChange={(checked) => methods.setValue("isActive", checked)} // Update the form value on change
            onColor="#86d3ff" // Optional: Customize the switch color
            onHandleColor="#2693e6" // Optional: Customize the handle color
            handleDiameter={20} // Optional: Customize the handle size
            uncheckedIcon={false} // Optional: Hide the unchecked icon
            checkedIcon={false} // Optional: Hide the checked icon
            height={24} // Optional: Customize the height
            width={48} // Optional: Customize the width
          />
        </div>

        <Button className="mt-14" type="submit">
          {banner ? "Update Banner" : "Create Banner"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default BannerForm;
