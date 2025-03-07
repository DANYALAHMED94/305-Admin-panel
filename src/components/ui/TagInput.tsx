"use client";

import React, { useState, useCallback, KeyboardEvent } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagInputProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ name, label, placeholder }) => {
  const { control, setValue, watch } = useFormContext();
  const tags = watch(name) || [];
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        const newTag = inputValue.trim();
        if (!tags.includes(newTag)) {
          const updatedTags = [...tags, newTag];
          setValue(name, updatedTags);
          setInputValue("");
        }
      }
    },
    [inputValue, tags, name, setValue]
  );

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      const updatedTags = tags.filter((tag: string) => tag !== tagToRemove);
      setValue(name, updatedTags);
    },
    [tags, name, setValue]
  );

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
        render={({ field }) => (
          <div>
            <Input
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default TagInput;
