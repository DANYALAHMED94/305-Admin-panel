"use client";

import { Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { searchAds } from "@/services/ad";
import { useState } from "react";
import TimePicker from "@/components/ui/TimePicker"; // Import the updated TimePicker
import { Check, ChevronDown } from "lucide-react"; // Import icons for the dropdown
import { cn } from "@/lib/utils";

interface AdSelectorProps {
  index: number;
  control: Control<any>;
  videoLength?: number; // Total video length in seconds (optional)
}

export const AdSelector = ({
  index,
  control,
  videoLength,
}: AdSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch ads based on search query
  const { data: adsData } = useQuery({
    queryKey: ["ads", searchQuery],
    queryFn: () => searchAds(searchQuery),
  });

  // Validate start time against video length
  const validateStartTime = (value: string) => {
    if (!videoLength) return true; // No validation if video length is not provided
    const [hours, minutes, seconds] = value.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds <= videoLength || "Start time exceeds video length";
  };

  return (
    <div className="flex gap-4 items-end">
      {/* Time Picker for Start Time */}
      <div className="flex-1">
        <Controller
          name={`ads.${index}.startTime`}
          control={control}
          rules={{
            required: "Start time is required",
            validate: validateStartTime,
          }}
          render={({ field, fieldState }) => (
            <TimePicker
              name={field.name}
              label="Start Time"
              placeholder="00:00:00"
            />
          )}
        />
      </div>

      {/* Custom Ad Selection Dropdown */}
      <div className="flex-1">
        <Controller
          name={`ads.${index}.ad`}
          control={control}
          rules={{ required: "Ad is required" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Ad
              </label>
              <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between",
                      fieldState.error && "border-red-500"
                    )}
                  >
                    {field.value
                      ? adsData?.data.find((ad) => ad._id === field.value)
                          ?.title
                      : "Select an ad"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="space-y-2">
                    {/* Search Input */}
                    <input
                      type="text"
                      placeholder="Search ads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 border-b focus:outline-none"
                    />

                    {/* Ad List */}
                    <div className="max-h-60 overflow-y-auto">
                      {adsData?.data.map((ad) => (
                        <div
                          key={ad._id}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            field.onChange(ad._id); // Update the form value
                            setIsDropdownOpen(false); // Close the dropdown
                          }}
                        >
                          <span>{ad.title}</span>
                          {field.value === ad._id && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
