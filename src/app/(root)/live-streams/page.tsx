"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllLiveVideos } from "@/services/video"; // Assuming this function can fetch all videos
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import VideoTable from "@/components/videos/VideoTable"; // Reuse the VideoTable component
import ColumnVisibilityPopover from "@/components/videos/ColumnVisibilityPopover"; // Reuse the ColumnVisibilityPopover
import VideoPagination from "@/components/videos/VideoPagination"; // Reuse the VideoPagination
import EmptyState from "@/components/videos/EmptyState"; // Reuse the EmptyState
import LoadingBall from "@/components/global/LoadingBall";

const LiveStreamsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {
      title: true,
      thumbnail: true,
      category: true,
      startDateTime: true,
      viewsCount: true,
      type: false,
      tags: false,
      videoEnabled: true,
      monetizationEnabled: false,
      adsEnabled: true,
      actions: true,
    }
  );
  const limit = 10;
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["live-streams", page, search],
    queryFn: () => getAllLiveVideos(page, limit, search), // Fetch only live streams
    placeholderData: (prev) => prev,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search by title or category..."
            value={search}
            onChange={handleSearch}
            className="w-64"
          />
          <ColumnVisibilityPopover
            visibleColumns={visibleColumns}
            toggleColumnVisibility={toggleColumnVisibility}
          />
        </div>
        <Button onClick={() => router.push("/live-streams/add")}>
          Add Live Stream
        </Button>
      </div>

      {isLoading ? (
        <LoadingBall />
      ) : error ? (
        <p>Error loading live streams</p>
      ) : data?.videos?.length === 0 ? (
        <EmptyState
          onAddVideo={() => router.push("/live-streams/add")}
          message="No live streams found."
        />
      ) : (
        <>
          <VideoTable
            videos={data?.videos || []}
            visibleColumns={visibleColumns}
            isLiveStream={true} // Pass a prop to indicate this is a live stream table
          />
          <div className="flex justify-center mt-4">
            <VideoPagination
              page={page}
              totalPages={data?.totalPages || 1}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LiveStreamsPage;
