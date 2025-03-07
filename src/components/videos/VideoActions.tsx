"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface VideoActionsProps {
  videoId: string;
}

const VideoActions: React.FC<VideoActionsProps> = ({ videoId }) => {
  const router = useRouter();

  return (
    <div className="mt-6 flex gap-4">
      <Button onClick={() => router.push(`/videos/edit/${videoId}`)}>
        Edit Video
      </Button>
      <Button variant="destructive">Delete Video</Button>
    </div>
  );
};

export default VideoActions;
