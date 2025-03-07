"use client";

import React from "react";
import { VideoFull } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatTime } from "@/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface VideoTableProps {
  videos: VideoFull[];
  visibleColumns: Record<string, boolean>;
}

const VideoTable: React.FC<VideoTableProps> = ({ videos, visibleColumns }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
          <TableRow>
            {visibleColumns.thumbnail && (
              <TableHead className="whitespace-nowrap">Thumbnail</TableHead>
            )}
            {visibleColumns.title && (
              <TableHead className="whitespace-nowrap">Title</TableHead>
            )}
            {visibleColumns.type && (
              <TableHead className="whitespace-nowrap">Type</TableHead>
            )}
            {visibleColumns.category && (
              <TableHead className="whitespace-nowrap">Category</TableHead>
            )}
            {visibleColumns.tags && (
              <TableHead className="whitespace-nowrap">Tags</TableHead>
            )}
            {visibleColumns.length && (
              <TableHead className="whitespace-nowrap">Length</TableHead>
            )}
            {visibleColumns.viewsCount && (
              <TableHead className="whitespace-nowrap">Views</TableHead>
            )}
            {visibleColumns.videoEnabled && (
              <TableHead className="whitespace-nowrap">Enabled</TableHead>
            )}
            {visibleColumns.monetizationEnabled && (
              <TableHead className="whitespace-nowrap">Monetization</TableHead>
            )}
            {visibleColumns.adsEnabled && (
              <TableHead className="whitespace-nowrap">Ads</TableHead>
            )}
            {visibleColumns.releaseDate && (
              <TableHead className="whitespace-nowrap">Release Date</TableHead>
            )}
            {visibleColumns.actions && (
              <TableHead className="whitespace-nowrap">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video, index) => (
            <TableRow
              key={video._id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              {visibleColumns.thumbnail && (
                <TableCell>
                  <Image
                    src={video?.thumbnail || "/placeholder-thumbnail.jpg"}
                    alt={video?.title}
                    width={140}
                    height={80}
                    className="object-contain rounded-md"
                  />
                </TableCell>
              )}
              {visibleColumns.title && (
                <TableCell className="whitespace-nowrap">
                  {video.title}
                </TableCell>
              )}
              {visibleColumns.type && (
                <TableCell className="whitespace-nowrap">
                  {video.type}
                </TableCell>
              )}
              {visibleColumns.category && (
                <TableCell className="whitespace-nowrap">
                  {video?.category?.name || "N/A"}
                </TableCell>
              )}
              {visibleColumns.tags && (
                <TableCell className="whitespace-nowrap">
                  {video.tags?.join(", ") || "N/A"}
                </TableCell>
              )}
              {visibleColumns.length && (
                <TableCell className="whitespace-nowrap">
                  {formatTime(video.length) || "N/A"}
                </TableCell>
              )}
              {visibleColumns.viewsCount && (
                <TableCell className="whitespace-nowrap">
                  {video.viewsCount}
                </TableCell>
              )}
              {visibleColumns.videoEnabled && (
                <TableCell className="whitespace-nowrap">
                  {video.videoEnabled ? "Yes" : "No"}
                </TableCell>
              )}
              {visibleColumns.monetizationEnabled && (
                <TableCell className="whitespace-nowrap">
                  {video.monetizationEnabled ? "Yes" : "No"}
                </TableCell>
              )}
              {visibleColumns.adsEnabled && (
                <TableCell className="whitespace-nowrap">
                  {video.adsEnabled ? "Yes" : "No"}
                </TableCell>
              )}
              {visibleColumns.releaseDate && (
                <TableCell className="whitespace-nowrap">
                  {video.releaseDate
                    ? new Date(video.releaseDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
              )}
              {visibleColumns.actions && (
                <TableCell className="whitespace-nowrap">
                  <Button
                    size="sm"
                    onClick={() => router.push(`/videos/edit/${video._id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VideoTable;
