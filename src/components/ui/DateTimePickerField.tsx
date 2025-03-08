"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateTimePickerFieldProps {
  name: string;
  label: string;
}

export const DateTimePickerField: React.FC<DateTimePickerFieldProps> = ({
  name,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value
                  ? format(new Date(field.value), "PPP p")
                  : "Pick a date and time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                initialFocus
              />
              <Input
                type="time"
                value={
                  field.value ? format(new Date(field.value), "HH:mm") : ""
                }
                onChange={(e) => {
                  const date = field.value ? new Date(field.value) : new Date();
                  const [hours, minutes] = e.target.value.split(":");
                  date.setHours(Number(hours));
                  date.setMinutes(Number(minutes));
                  field.onChange(date.toISOString());
                }}
                className="mt-2"
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};
