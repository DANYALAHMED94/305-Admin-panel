"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player"; // For video playback
import Image from "next/image"; // For image display
import { Button } from "../ui/button";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
}

const MediaModal = ({ isOpen, onClose, mediaUrl }: MediaModalProps) => {
  const isVideo = mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".webm");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview Ad Media</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          {isVideo ? (
            <ReactPlayer url={mediaUrl} controls width="100%" height="auto" />
          ) : (
            <Image
              src={mediaUrl}
              alt="Ad Media"
              width={500}
              height={300}
              className="object-cover"
            />
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
