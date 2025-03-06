"use client";
import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getAllParentCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/category";
import { uploadImage } from "@/utils";
import { Category } from "@/types";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import LoadingBall from "@/components/global/LoadingBall";

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
    onError: () => toast.error("Error adding a new category!"),
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
    onError: () => toast.error("Error updating the category!"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
    onError: () => toast.error("Error deleting the sport!"),
  });

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleSave = async () => {
    let imageUrl = editingCategory?.imageUrl || "";

    if (image) {
      imageUrl = await uploadImage(image);
    }

    if (editingCategory) {
      updateMutation.mutate({
        _id: editingCategory._id,
        name: categoryName,
        imageUrl,
      });
    } else {
      addMutation.mutate({ name: categoryName, imageUrl });
    }

    setCategoryName("");
    setImage(null);
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const toBeDeleted = categories?.find((s) => s._id === id);
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
            setEditingCategory(null);
            setCategoryName("");
            setIsModalOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Sport" : "Add a New Sport"}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <div
            {...getRootProps()}
            className="border-2 min-h-24 border-dashed p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>
                {image
                  ? image.name
                  : "Drag & drop an image, or click to select"}
              </p>
            )}
          </div>
          <Button
            onClick={handleSave}
            disabled={addMutation.isPending || updateMutation.isPending}
          >
            {editingCategory ? "Update" : "Save"}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <Card key={category._id}>
            <CardHeader>
              <CardTitle className="text-xl">
                <Link
                  className="hover:text-blue-600"
                  href={`/category/${category._id}`}
                >
                  {category.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                width={200}
                height={150}
                src={category?.imageUrl || "/default-sport-image.webp"}
                alt={category.name}
                className="h-44 w-full object-cover rounded-md"
              />
              <div className="flex py-2 items-center justify-between">
                <Button
                  onClick={() => {
                    setEditingCategory(category);
                    setCategoryName(category.name);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(category._id)}>
                  <Trash2 />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
