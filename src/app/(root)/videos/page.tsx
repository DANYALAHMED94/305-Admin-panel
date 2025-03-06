"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecordedVideos } from "@/services/video";
import { Video } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const VideosPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by category..."
          value={search}
          onChange={handleSearch}
          className="w-1/3"
        />
        <Button onClick={() => router.push("/videos/add")}>Add Video</Button>
      </div>

      {isLoading ? (
        <p>Loading videos...</p>
      ) : error ? (
        <p>Error loading videos</p>
      ) : (
        <>
          <Table className="min-h-[50vh]">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Length</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.videos?.map((video: Video) => (
                <TableRow key={video._id}>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{video.category}</TableCell>
                  <TableCell>{video.length || "N/A"}</TableCell>
                  <TableCell>{video.viewsCount}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => router.push(`/videos/edit/${video._id}`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination using ShadCN */}
          <div className="flex justify-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    isActive={page > 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4">
                    Page {page} of {data?.totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) =>
                        prev < data?.totalPages! ? prev + 1 : prev
                      )
                    }
                    isActive={page < data?.totalPages!}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default VideosPage;
