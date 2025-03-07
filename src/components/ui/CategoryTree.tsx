"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import { getAllCategories } from "@/services/category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type CategoryTreeProps = {
  name: string;
  label?: string;
};

const CategoryTree: React.FC<CategoryTreeProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Convert flat category array into a tree structure
  const buildCategoryTree = (parentId: string | null): Category[] => {
    return categories
      .filter((cat) => cat.parentCategory === parentId)
      .filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const toggleExpand = (categoryId: string) => {
    setExpanded((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const renderCategories = (parentId: string | null) => {
    const childCategories = buildCategoryTree(parentId);

    if (childCategories.length === 0) return null;

    return (
      <ul className="ml-4 border-l border-gray-200 pl-2">
        {childCategories.map((category) => (
          <li key={category._id} className="mb-1">
            <div
              className={cn(
                "flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors",
                expanded[category._id] && "bg-gray-50"
              )}
            >
              {buildCategoryTree(category._id).length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(category._id);
                  }}
                >
                  {expanded[category._id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </Button>
              )}
              {category.imageUrl && (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-6 h-6 rounded-md"
                />
              )}
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 flex-1">
                    <input
                      type="radio"
                      value={category._id}
                      checked={field.value === category._id}
                      onChange={() => field.onChange(category._id)}
                      className="hidden"
                    />
                    <span
                      className={cn(
                        "flex-1 text-sm",
                        field.value === category._id
                          ? "font-semibold text-blue-600"
                          : "text-gray-700"
                      )}
                    >
                      {category.name}
                    </span>
                  </label>
                )}
              />
            </div>
            {expanded[category._id] && renderCategories(category._id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Error loading categories</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          renderCategories(null) // Fetch root categories (parentCategory === null)
        )}
      </div>
    </div>
  );
};

export default CategoryTree;
