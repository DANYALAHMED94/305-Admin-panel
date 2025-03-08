"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddVideo: () => void;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddVideo, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-gray-500">{message || "No videos found."}</p>
      <Button onClick={onAddVideo} className="mt-4">
        Add Video
      </Button>
    </div>
  );
};

export default EmptyState;
