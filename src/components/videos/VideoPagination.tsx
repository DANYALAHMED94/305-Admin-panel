"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface VideoPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const VideoPagination: React.FC<VideoPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            isActive={page > 1}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page < totalPages ? page + 1 : page)}
            isActive={page < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default VideoPagination;
