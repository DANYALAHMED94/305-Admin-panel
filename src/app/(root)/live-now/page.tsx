"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input"; // shadcn Input component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // shadcn Table components
import Switch from "react-switch"; // react-switch library
import {
  getAllVideos,
  addLiveNowVideo,
  removeLiveNowVideo,
} from "@/services/liveNow"; // Import liveNow services
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn Skeleton component

const LiveNowPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();

  // Fetch all live videos with pagination and search
  const {
    data: videosData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["live-videos", page, limit, searchTerm],
    queryFn: () => getAllVideos(page, limit, searchTerm),
  });

  // Mutation for adding a video to live now
  const addLiveNowMutation = useMutation({
    mutationFn: addLiveNowVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["live-videos"] }); // Refetch videos after adding
    },
  });

  // Mutation for removing a video from live now
  const removeLiveNowMutation = useMutation({
    mutationFn: removeLiveNowVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["live-videos"] }); // Refetch videos after removing
    },
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page when searching
  };

  // Handle switch toggle
  const handleToggleLiveNow = (videoId: string, isLiveNow: boolean) => {
    if (isLiveNow) {
      removeLiveNowMutation.mutate(videoId);
    } else {
      addLiveNowMutation.mutate(videoId);
    }
  };

  if (isError) return <div>Error fetching videos</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Live Now Videos</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search live videos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-md"
        />
      </div>

      {/* Videos Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Live Now</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: limit }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-16 h-10 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : videosData?.data.length === 0 ? (
            // No Videos Found
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6">
                No live videos found.
              </TableCell>
            </TableRow>
          ) : (
            // Render Videos
            videosData?.data.map((video) => (
              <TableRow key={video._id}>
                <TableCell>
                  <Image
                    width={200}
                    height={150}
                    src={video.thumbnail!}
                    alt={video.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>
                  <Switch
                    checked={video.isLiveNow}
                    onChange={() =>
                      handleToggleLiveNow(video._id, video.isLiveNow)
                    }
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={24}
                    width={48}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={
            !videosData?.pagination ||
            page >= Math.ceil(videosData.pagination.total / limit)
          }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LiveNowPage;
