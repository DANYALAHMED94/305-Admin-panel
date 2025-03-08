"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBannerById } from "@/services/banner";
import BannerForm from "@/components/banners/BannerForm";
import LoadingBall from "@/components/global/LoadingBall";

const EditBannerPage = () => {
  const { id } = useParams(); // Get the banner ID from the URL

  // Fetch the banner data by ID
  const {
    data: banner,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banner", id],
    queryFn: () => getBannerById(id as string),
  });

  if (isLoading) return <LoadingBall />; // Show a loading spinner
  if (isError) return <p>Error fetching banner</p>; // Show an error message

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
        <h1 className="text-2xl font-bold mb-6">Edit Banner</h1>
        {/* Pass the banner data to the BannerForm component */}
        <BannerForm
          banner={banner}
          onSuccess={() => (window.location.href = "/banners")}
        />
      </div>
    </div>
  );
};

export default EditBannerPage;
