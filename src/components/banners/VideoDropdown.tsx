"use client";

import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllVideos } from "@/services/video";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VideoDropdownProps {
  onSelect: (videoId: string) => void;
  videoId: string;
}

const VideoDropdown: React.FC<VideoDropdownProps> = ({ onSelect, videoId }) => {
  const [search, setSearch] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["videos", search],
      queryFn: ({ pageParam = 1 }) => getAllVideos(pageParam, 10, search),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    });

  const videos = data?.pages.flatMap((page) => page.videos) || [];

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Add this line
    e.stopPropagation(); // This stops the event from bubbling up
    fetchNextPage();
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-64 rounded-md border p-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className={cn(
              "p-2 hover:bg-gray-100 cursor-pointer flex gap-2",
              videoId === video._id && "bg-sky-100 hover:bg-sky-200"
            )}
            onClick={() => onSelect(video._id)}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={120}
              height={80}
              className="w-16 h-10 object-cover rounded"
            />
            <p>{video.title}</p>
          </div>
        ))}
        {hasNextPage && (
          <button
          type="button" // Add this
            onClick={handleLoadMore} // Use the new handler
            disabled={isFetchingNextPage}
            className="w-full p-2 text-center text-blue-500 cursor-pointer"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </ScrollArea>
    </div>
  );
};

export default VideoDropdown;