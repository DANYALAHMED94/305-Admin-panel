"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllParentCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/category";
import { Button } from "@/components/ui/button";
import LoadingBall from "@/components/global/LoadingBall";
import toast from "react-hot-toast";
import { Category } from "@/types";
import CategoryTable from "@/components/category/CategoryTable";
import CategoryModal from "@/components/category/CategoryModal";

const CategoriesPage = () => {
  const queryClient = useQueryClient();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({ queryKey: ["categories"], queryFn: getAllParentCategories });

  const addMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
    onError: () => toast.error("Error adding category!"),
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
    onError: () => toast.error("Error updating category!"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
    onError: () => toast.error("Error deleting category!"),
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (name: string, imageUrl?: string) => {
    if (selectedCategory) {
      updateMutation.mutate({ _id: selectedCategory._id, name, imageUrl });
    } else {
      addMutation.mutate({ name, imageUrl });
    }
  };

  const handleDelete = (id: string) => {
    const toBeDeleted = categories?.find((c) => c._id === id);
    if (!confirm(`Are you sure you want to delete ${toBeDeleted?.name}?`))
      return;
    deleteMutation.mutate(id);
  };

  if (isLoading) return <LoadingBall />;
  if (error) return <p className="text-red-500">Error loading categories</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setIsModalOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        category={selectedCategory}
      />

      <CategoryTable
        categories={categories!}
        onEdit={(c) => {
          setSelectedCategory(c);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoriesPage;
