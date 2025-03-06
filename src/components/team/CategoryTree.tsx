"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { ChevronRight, ChevronDown } from "lucide-react";
import { getAllCategories } from "@/services/category";

type CategoryTreeProps = {
  selectedCategory: string | null;
  onSelect: (categoryId: string) => void;
};

const CategoryTree: React.FC<CategoryTreeProps> = ({
  selectedCategory,
  onSelect,
}) => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p className="text-red-500">Error loading categories</p>;

  // Convert flat category array into a tree structure
  const buildCategoryTree = (parentId: string | null): Category[] => {
    return categories.filter((cat) => cat.parentCategory === parentId);
  };

  const toggleExpand = (categoryId: string) => {
    setExpanded((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const renderCategories = (parentId: string | null) => {
    const childCategories = buildCategoryTree(parentId);

    if (childCategories.length === 0) return null;

    return (
      <ul className="ml-4 border-l border-gray-300 pl-2">
        {childCategories.map((category) => (
          <li key={category._id} className="mb-2">
            <div
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 ${
                selectedCategory === category._id ? "bg-gray-200" : ""
              }`}
              onClick={() => onSelect(category._id)}
            >
              {buildCategoryTree(category._id).length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering `onSelect`
                    toggleExpand(category._id);
                  }}
                  className="focus:outline-none"
                >
                  {expanded[category._id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              )}
              {category.imageUrl && (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-6 h-6 rounded-md"
                />
              )}
              <span>{category.name}</span>
            </div>
            {expanded[category._id] && renderCategories(category._id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-h-64 overflow-auto border p-2 rounded-md bg-white shadow-sm">
      <h3 className="font-semibold mb-2">Select Category</h3>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories available.</p>
      ) : (
        renderCategories(null) // Fetch root categories (parentCategory === null)
      )}
    </div>
  );
};

export default CategoryTree;
