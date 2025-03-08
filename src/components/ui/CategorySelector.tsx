"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/category";
import { Controller, useFormContext } from "react-hook-form";

type CategorySelectorProps = {
  name: string;
  label?: string;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ name, label }) => {
  const { control, watch, setValue } = useFormContext();
  const [selectedParentCategory, setSelectedParentCategory] = useState<
    string | null
  >(null);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Watch the category field to initialize the selected parent category
  const selectedCategory = watch(name);

  useEffect(() => {
    if (selectedCategory) {
      // Find the selected category in the list
      const category = categories.find((cat) => cat._id === selectedCategory);
      if (category) {
        // If the category has a parent, set the parent as the selected parent category
        if (category.parentCategory) {
          setSelectedParentCategory(category.parentCategory);
        } else {
          // If the category is a parent, set it as the selected parent category
          setSelectedParentCategory(category._id);
        }
      }
    }
  }, [selectedCategory, categories]);

  // Get all parent categories (categories with no parent)
  const parentCategories = categories.filter(
    (cat) => cat.parentCategory === null
  );

  // Get subcategories of the selected parent category
  const subCategories = selectedParentCategory
    ? categories.filter((cat) => cat.parentCategory === selectedParentCategory)
    : [];

  // Check if a parent category has subcategories
  const hasSubcategories = (categoryId: string) => {
    return categories.some((cat) => cat.parentCategory === categoryId);
  };

  // Handle parent category selection
  const handleParentCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedParentCategory(value);

    // If the selected parent category has no subcategories, set it as the category value
    if (!hasSubcategories(value)) {
      setValue(name, value); // Set the parent category as the form value
    } else {
      setValue(name, ""); // Reset the category value if the parent has subcategories
    }
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Parent Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parent Category
        </label>
        <select
          onChange={handleParentCategoryChange}
          value={selectedParentCategory || ""}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a parent category</option>
          {parentCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Dropdown (only shown if the selected parent category has subcategories) */}
      {selectedParentCategory && hasSubcategories(selectedParentCategory) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a subcategory</option>
                {subCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      )}

      {/* Loading and Error States */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading categories...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Error loading categories</p>
      )}
      {!isLoading && !isError && categories.length === 0 && (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
  );
};

export default CategorySelector;
