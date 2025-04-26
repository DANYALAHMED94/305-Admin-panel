// components/ui/RecommendedCategoriesSelector.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { X, Radio, ThumbsUp, Calendar } from "lucide-react";

interface CustomLabelSelectorProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const customLabels = [
  // {
  //   label: "Live Now",
  //   value: "live-now",
  //   icon: <Radio className="w-4 h-4 mr-1" />,
  // },
  {
    label: "Recommended",
    value: "recommended",
    icon: <ThumbsUp className="w-4 h-4 mr-1" />,
  },
  {
    label: "Coming Up",
    value: "coming-up",
    icon: <Calendar className="w-4 h-4 mr-1" />,
  },
];

const CustomLabelSelector: React.FC<CustomLabelSelectorProps> = ({
  name,
  label,
  placeholder = "Select recommended categories...",
  required = false,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedLabels = watch(name) || [];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    if (categoryId && !selectedLabels.includes(categoryId)) {
      const newCategories = [...selectedLabels, categoryId];
      setValue(name, newCategories, { shouldValidate: true });
    }
    e.target.value = ""; // Reset select
  };

  const handleRemove = (categoryId: string) => {
    const newLabels = selectedLabels.filter((id: string) => id !== categoryId);
    setValue(name, newLabels, { shouldValidate: true });
  };

  // Check if field is required and has error
  const hasError = !!errors[name];

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div>
        <div className="relative">
          <select
            onChange={handleSelect}
            className={`w-full px-3 py-2 border ${
              hasError ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
            } ${
              hasError ? "focus:border-red-500" : "focus:border-blue-500"
            } appearance-none pr-8`}
            defaultValue=""
            aria-required={required}
            aria-invalid={hasError}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {customLabels.map((label) => (
              <option key={label.value} value={label.value}>
                {label.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Display selected categories as badges */}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedLabels.map((categoryId: string) => {
            const label = customLabels?.find((c) => c.value === categoryId);
            return (
              <span
                key={categoryId}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300"
              >
                <span className="flex items-center">
                  {label?.icon}
                  {label?.label || categoryId}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(categoryId)}
                  className="ml-1 p-0.5 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              </span>
            );
          })}
        </div>

        {/* Error message */}
        {hasError && (
          <p className="mt-1 text-sm text-red-600">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomLabelSelector;
