"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface TimePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (time: string) => void; // Pass the time string directly
}

const TimePicker: React.FC<TimePickerProps> = ({
  name,
  label,
  placeholder,
  onChange,
}) => {
  const { control, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleTimeChange = () => {
    // Format the time as HH:MM:SS
    const timeString = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setValue(name, timeString, { shouldValidate: true });
    onChange?.(timeString); // Pass the time string to the parent
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between",
                    fieldState.error && "border-red-500"
                  )}
                >
                  {field.value || placeholder || "Select time"}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Hours</label>
                    <Input
                      type="number"
                      min={0}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Minutes</label>
                    <Input
                      type="number"
                      min={0}
                      max={59}
                      value={minutes}
                      onChange={(e) => setMinutes(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">Seconds</label>
                    <Input
                      type="number"
                      min={0}
                      max={59}
                      value={seconds}
                      onChange={(e) => setSeconds(Number(e.target.value))}
                    />
                  </div>
                </div>
                <Button onClick={handleTimeChange} className="mt-4 w-full">
                  Apply
                </Button>
              </PopoverContent>
            </Popover>
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default TimePicker;
