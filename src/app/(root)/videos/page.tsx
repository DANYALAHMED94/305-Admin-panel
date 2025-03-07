"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecordedVideos } from "@/services/video";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import VideoTable from "@/components/videos/VideoTable";
import ColumnVisibilityPopover from "@/components/videos/ColumnVisibilityPopover";
import VideoPagination from "@/components/videos/VideoPagination";
import EmptyState from "@/components/videos/EmptyState";

const VideosPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {
      title: true,
      thumbnail: true,
      category: true,
      length: true,
      viewsCount: true,
      type: false,
      tags: false,
      videoEnabled: true,
      monetizationEnabled: false,
      adsEnabled: true,
      releaseDate: true,
      actions: true,
    }
  );
  const limit = 10;
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["videos", page, search],
    queryFn: () => getAllRecordedVideos(page, limit, search),
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
        <Button onClick={() => router.push("/videos/add")}>Add Video</Button>
      </div>

      {isLoading ? (
        <p>Loading videos...</p>
      ) : error ? (
        <p>Error loading videos</p>
      ) : data?.videos?.length === 0 ? (
        <EmptyState onAddVideo={() => router.push("/videos/add")} />
      ) : (
        <>
          <VideoTable
            videos={data?.videos || []}
            visibleColumns={visibleColumns}
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

export default VideosPage;
