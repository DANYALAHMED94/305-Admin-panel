"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  activateBanner,
  deactivateBanner,
  getAllBanners,
} from "@/services/banner";
import BannerCard from "@/components/banners/BannerCard";

const BannerList = () => {
  const queryClient = useQueryClient();

  const {
    data: banners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });

  const toggleBannerMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      if (isActive) {
        return activateBanner(id);
      } else {
        return deactivateBanner(id);
      }
    },
    onSuccess: () => {
      // Invalidate the banners query to refetch data
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const handleToggle = (id: string, isActive: boolean) => {
    toggleBannerMutation.mutate({ id, isActive });
  };

  if (isLoading) return <p>Loading banners...</p>;
  if (error) return <p>Error fetching banners</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {banners?.map((banner) => (
        <BannerCard key={banner?._id} banner={banner} onToggle={handleToggle} />
      ))}
    </div>
  );
};

export default BannerList;
