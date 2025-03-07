"use client";

import React from "react";

interface VideoDetailsProps {
  title: string;
  shortDescription?: string;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  title,
  shortDescription,
}) => {
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {shortDescription && (
        <p className="text-gray-600 mt-2">{shortDescription}</p>
      )}
    </div>
  );
};

export default VideoDetails;
