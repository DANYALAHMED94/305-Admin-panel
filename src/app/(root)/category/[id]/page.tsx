"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, Trash2 } from "lucide-react";
import {
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoriesByParent,
} from "@/services/category";
import { Category } from "@/types";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils"; // Import the upload function
import LoadingBall from "@/components/global/LoadingBall";
import { useParams } from "next/navigation";
import Link from "next/link";

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryId = params.id as string;
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch category details
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: !!categoryId,
  });

  // Fetch subcategories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoriesByParent(categoryId),
    enabled: !!categoryId,
  });

  const addMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] }),
    onError: () => toast.error("Failed to add category"),
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] }),
    onError: () => toast.error("Failed to update category"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] }),
    onError: () => toast.error("Failed to delete category"),
  });

  // Handle Image Upload via Drag and Drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    },
  });

  const handleSave = async () => {
    let uploadedImageUrl = editingCategory?.imageUrl || ""; // Keep existing image if editing

    if (image) {
      try {
        uploadedImageUrl = await uploadImage(image); // Upload and get URL
      } catch (error) {
        toast.error("Image upload failed!");
        return;
      }
    }

    const categoryData = {
      name: categoryName,
      imageUrl: uploadedImageUrl,
      parentCategory: categoryId,
    };

    if (editingCategory) {
      updateMutation.mutate({ _id: editingCategory._id, ...categoryData });
    } else {
      addMutation.mutate(categoryData);
    }

    // Reset Fields
    setCategoryName("");
    setImage(null);
    setPreviewImage(null);
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setPreviewImage(category.imageUrl || null);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setPreviewImage(null);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  if (categoriesLoading || categoryLoading) return <LoadingBall />;

  return (
    <div className="p-6 space-y-6">
      {/* Category Details */}
      <div className="flex space-x-4">
        <div>
          <Link href={"/category"}>
            <ArrowLeftIcon />
          </Link>
        </div>
        <Image
          src={category?.imageUrl || "/default-sport.png"}
          width={300}
          height={200}
          className="rounded-md"
          alt={category?.name || "Image"}
        />
        <div className="h-full gap-3 flex flex-col">
          <h1 className="text-2xl font-bold">{category?.name}</h1>
          <p className="text-gray-500 text-xl font-medium italic">
            #{category?._id}
          </p>
        </div>
      </div>

      {/* Subcategories Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Sub Categories</h2>
        <Button onClick={handleAdd}>Add Sub Category</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory
                  ? "Edit SubCategory"
                  : "Add a New Sub Category"}
              </DialogTitle>
            </DialogHeader>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter name"
            />

            {/* Drag & Drop Image Upload */}
            <div
              {...getRootProps()}
              className="border-2 min-h-24 border-dashed p-4 mt-4 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {previewImage ? (
                <Image
                  src={previewImage}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="mx-auto"
                />
              ) : (
                <p>Drag & drop an image, or click to select one</p>
              )}
            </div>

            <Button
              disabled={addMutation.isPending || updateMutation.isPending}
              onClick={handleSave}
            >
              {editingCategory ? "Update" : "Save"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subcategories Table */}
      {categories?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-32">Image</TableHead>
              <TableHead className="w-full">Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category._id}>
                <TableCell className="min-w-32">
                  <Image
                    width={100}
                    height={100}
                    src={category?.imageUrl || "/default-sport-image.webp"}
                    alt={category.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="w-full">{category.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(category)}>Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(category._id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mt-4">
            No sub category created for this category yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
