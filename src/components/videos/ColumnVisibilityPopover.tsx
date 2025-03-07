"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ColumnVisibilityPopoverProps {
  visibleColumns: Record<string, boolean>;
  toggleColumnVisibility: (column: string) => void;
}

const ColumnVisibilityPopover: React.FC<ColumnVisibilityPopoverProps> = ({
  visibleColumns,
  toggleColumnVisibility,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Columns</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          {Object.keys(visibleColumns).map((column) => {
            if (
              column === "title" ||
              column === "thumbnail" ||
              column === "actions"
            )
              return null;
            return (
              <div key={column} className="flex items-center space-x-2">
                <Checkbox
                  id={column}
                  checked={visibleColumns[column]}
                  onCheckedChange={() => toggleColumnVisibility(column)}
                />
                <Label htmlFor={column} className="capitalize">
                  {column}
                </Label>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnVisibilityPopover;
