"use client"; // Mark this as a Client Component

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import AdModal from "@/components/ads/AdModal";
import { getAllAds } from "@/services/ad";
import { Ad } from "@/types";
import { Edit, Eye } from "lucide-react"; // Icons for edit and view
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MediaModal from "@/components/ads/MediaModal"; // New component for media preview
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // For limit selection

const AdsPage = () => {
  // State for pagination
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  // Fetch all ads using React Query with pagination
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ads", page, limit], // Include page and limit in the query key
    queryFn: () => getAllAds(page, limit), // Pass page and limit to the API call
  });

  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedAd, setSelectedAd] = React.useState<Ad | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = React.useState(false);
  const [mediaUrl, setMediaUrl] = React.useState<string>("");

  // Handle opening the modal for creating a new ad
  const handleCreateAd = () => {
    setSelectedAd(null); // Reset selected ad
    setIsModalOpen(true);
  };

  // Handle opening the modal for editing an ad
  const handleEditAd = (ad: Ad) => {
    setSelectedAd(ad); // Set the selected ad
    setIsModalOpen(true);
  };

  // Handle opening the media modal for viewing an ad
  const handleViewAd = (mediaUrl: string) => {
    setMediaUrl(mediaUrl);
    setIsMediaModalOpen(true);
  };

  // Handle changing the page
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle changing the limit
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to the first page when changing the limit
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ads Management</h1>
        <Button onClick={handleCreateAd}>Create New Ad</Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-red-500">
          Failed to fetch ads. Please try again later.
        </div>
      )}

      {/* No Ads Found */}
      {!isLoading && !isError && data?.data.length === 0 && (
        <div className="text-gray-500">No ads found.</div>
      )}

      {/* Ads Table */}
      {!isLoading && !isError && data?.data?.length! > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Media URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>{ad.type}</TableCell>
                <TableCell>{ad.mediaUrl}</TableCell>
                <TableCell>{ad.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell className="flex space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditAd(ad)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Ad</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewAd(ad.mediaUrl)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Ad</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination and Limit Selection */}
      {!isLoading && !isError && data?.pagination && (
        <div className="flex justify-between items-center mt-6">
          <div>
            Page {data.pagination.page} of{" "}
            {Math.ceil(data.pagination.total / data.pagination.limit)}
          </div>
          <div className="flex items-center space-x-4">
            {/* Limit Selection */}
            <Select
              value={limit.toString()}
              onValueChange={(value) => handleLimitChange(Number(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            {/* Pagination Buttons */}
            <div className="space-x-2">
              <Button
                disabled={data.pagination.page === 1}
                onClick={() => handlePageChange(data.pagination.page - 1)}
              >
                Previous
              </Button>
              <Button
                disabled={
                  data.pagination.page >=
                  Math.ceil(data.pagination.total / data.pagination.limit)
                }
                onClick={() => handlePageChange(data.pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Create/Edit Ad */}
      <AdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ad={selectedAd}
      />

      {/* Modal for Viewing Media (Image/Video) */}
      <MediaModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        mediaUrl={mediaUrl}
      />
    </div>
  );
};

export default AdsPage;
