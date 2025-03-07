"use client";

import React from "react";
import { formatTime } from "@/utils";

interface VideoMetadataProps {
  length: number;
  viewsCount: number;
  releaseDate?: Date;
  videoEnabled: boolean;
  monetizationEnabled: boolean;
  adsEnabled: boolean;
}

const VideoMetadata: React.FC<VideoMetadataProps> = ({
  length,
  viewsCount,
  releaseDate,
  videoEnabled,
  monetizationEnabled,
  adsEnabled,
}) => {
  return (
    <div className="mt-6 space-y-2">
      <p>
        <span className="font-semibold">Length:</span> {formatTime(length)}
      </p>
      <p>
        <span className="font-semibold">Views:</span> {viewsCount}
      </p>
      {releaseDate && (
        <p>
          <span className="font-semibold">Release Date:</span>{" "}
          {new Date(releaseDate).toLocaleDateString()}
        </p>
      )}
      <p>
        <span className="font-semibold">Video Enabled:</span>{" "}
        {videoEnabled ? "Yes" : "No"}
      </p>
      <p>
        <span className="font-semibold">Monetization Enabled:</span>{" "}
        {monetizationEnabled ? "Yes" : "No"}
      </p>
      <p>
        <span className="font-semibold">Ads Enabled:</span>{" "}
        {adsEnabled ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default VideoMetadata;
