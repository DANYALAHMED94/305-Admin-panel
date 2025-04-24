"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { BannerFull } from "@/types";
import { Button } from "@/components/ui/button"; // Import the Button component

interface BannerCardProps {
  banner: BannerFull;
  onToggle: (id: string, isActive: boolean) => void;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner, onToggle }) => {
  const [isActive, setIsActive] = useState(banner.isActive);

  const handleToggle = async (checked: boolean) => {
    setIsActive(checked); // Optimistic update
    try {
      onToggle(banner?._id, checked); // Notify parent component
    } catch (error) {
      setIsActive(!checked); // Revert on error
      console.error("Error toggling banner:", error);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
      {/* Banner Image */}
      <div className="relative w-full h-48 rounded-md overflow-hidden">
        <Image
          src={banner.imageUrl}
          alt="Banner"
          className="object-cover"
          fill // Use fill to make the image cover the container
        />
      </div>

      {/* Video Title */}
      {banner.videoId && (
        <p className="mt-2 text-sm font-medium text-gray-700">
          Video:{" "}
          <Link
            className="hover:text-blue-600"
            href={`/videos/details/${banner?.videoId?._id}`}
          >
            {banner?.videoId?.title}
          </Link>
        </p>
      )}

      {!banner.videoId && <p className="mt-2 text-sm font-medium">No Video</p>}

      {/* Toggle Switch */}
      <div className="flex items-center space-x-2 mt-2">
        <Switch checked={isActive} onCheckedChange={handleToggle} />
        <span className="text-sm text-gray-600">
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Edit Button */}
      <div className="mt-4">
        <Link href={`/banners/edit/${banner._id}`}>
          <Button variant="outline" className="w-full">
            Edit Banner
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BannerCard;
