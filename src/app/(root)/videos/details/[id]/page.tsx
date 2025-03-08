"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getVideoById } from "@/services/video";
import LoadingBall from "@/components/global/LoadingBall";
import VideoPlayer from "@/components/videos/VideoPlayer";
import VideoDetails from "@/components/videos/VideoDetails";
import VideoMetadata from "@/components/videos/VideoMetadata";
import VideoActions from "@/components/videos/VideoActions";

const VideoDetailPage = () => {
  const { id } = useParams();

  // Fetch video details
  const {
    data: video,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id as string),
    enabled: !!id, // Only fetch if ID exists
  });

  if (isLoading) return <LoadingBall />;
  if (isError)
    return (
      <p className="text-center text-red-500">Error loading video details.</p>
    );
  if (!video)
    return <p className="text-center text-gray-500">Video not found.</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="max-w-[900px] mx-auto">
        {/* Video Player */}
        <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnail} />

        {/* Video Details */}
        <VideoDetails
          title={video.title}
          shortDescription={video.shortDescription}
        />

        {/* Video Metadata */}
        <VideoMetadata
          length={video.length}
          viewsCount={video.viewsCount}
          releaseDate={video.releaseDate}
          videoEnabled={video.videoEnabled}
          monetizationEnabled={video.monetizationEnabled}
          adsEnabled={video.adsEnabled}
        />

        {/* Video Actions */}
        <VideoActions videoId={video._id} type={video.type} />
      </div>
    </div>
  );
};

export default VideoDetailPage;
