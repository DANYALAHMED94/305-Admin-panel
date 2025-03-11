"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { getAllCategories } from "@/services/category";

type CategorySelectorProps = {
  selectedCategory: string | null;
  onSelect: (categoryId: string) => void;
};

const CategorySelectorDropdown: React.FC<CategorySelectorProps> = ({
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

  const [selectedParentCategory, setSelectedParentCategory] = useState<
    string | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (selectedCategory) {
      // Find the selected category
      const category = categories.find((cat) => cat._id === selectedCategory);

      if (category) {
        // If the selected category has a parent, set both parent and subcategory
        if (category.parentCategory) {
          setSelectedParentCategory(category.parentCategory);
          setSelectedSubCategory(category._id);
        } else {
          // If it's a top-level category, set only the parent category
          setSelectedParentCategory(category._id);
          setSelectedSubCategory(null);
        }
      } else {
        // If the selected category is not found, reset the selections
        setSelectedParentCategory(null);
        setSelectedSubCategory(null);
      }
    } else {
      // If no category is selected, reset the selections
      setSelectedParentCategory(null);
      setSelectedSubCategory(null);
    }
  }, [selectedCategory, categories]);

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p className="text-red-500">Error loading categories</p>;

  // Get top-level categories (categories with no parent)
  const topLevelCategories = categories.filter(
    (cat) => cat.parentCategory === null
  );

  // Get subcategories of the selected parent category
  const subCategories = categories.filter(
    (cat) => cat.parentCategory === selectedParentCategory
  );

  const handleParentCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const parentId = e.target.value;
    setSelectedParentCategory(parentId);
    setSelectedSubCategory(null); // Reset subcategory selection when parent changes
    onSelect(parentId); // Select the parent category by default
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategoryId = e.target.value;
    setSelectedSubCategory(subCategoryId);
    onSelect(subCategoryId); // Select the subcategory
  };

  return (
    <div className="space-y-4">
      {/* Parent Category Dropdown */}
      <div>
        <label
          htmlFor="parent-category"
          className="block text-sm font-medium text-gray-700"
        >
          Select Category
        </label>
        <select
          id="parent-category"
          value={selectedParentCategory || ""}
          onChange={handleParentCategoryChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {topLevelCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Dropdown (only shown if subcategories exist) */}
      {selectedParentCategory && subCategories.length > 0 && (
        <div>
          <label
            htmlFor="sub-category"
            className="block text-sm font-medium text-gray-700"
          >
            Select Subcategory
          </label>
          <select
            id="sub-category"
            value={selectedSubCategory || ""}
            onChange={handleSubCategoryChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CategorySelectorDropdown;
