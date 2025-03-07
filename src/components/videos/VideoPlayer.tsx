"use client";

import React from "react";
import ReactPlayer from "react-player";
import Image from "next/image";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnail }) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
      {/* {thumbnail && (
        <Image
          src={thumbnail}
          alt="Video Thumbnail"
          fill
          className="object-cover"
        />
      )} */}
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        playing
        light={thumbnail}
      />
    </div>
  );
};

export default VideoPlayer;
