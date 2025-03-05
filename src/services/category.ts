import axios from "axios";
import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const CATEGORY_URL = "/category";

// Fetch all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get(CATEGORY_URL);
    return (response?.data as Category[]) ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Fetch all categories
export const getAllParentCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get(`${CATEGORY_URL}/parent`);
    return (response?.data as Category[]) || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Fetch all categories by parent
export const getCategoriesByParent = async (
  id: string
): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get(`${CATEGORY_URL}/parent/${id}`);
    return (response?.data as Category[]) || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Fetch category by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await axiosInstance.get(`${CATEGORY_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw new Error("Failed to fetch category");
  }
};

// Create a new category
export const createCategory = async (data: {
  name: string;
  imageUrl?: string;
  parentCategory?: string;
}): Promise<Category> => {
  try {
    const response = await axiosInstance.post(CATEGORY_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

// Update an existing category
export const updateCategory = async (data: {
  _id: string;
  name: string;
  imageUrl?: string;
  parentCategory?: string;
}): Promise<Category> => {
  try {
    const response = await axiosInstance.put(
      `${CATEGORY_URL}/${data._id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
};

// Delete a category
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${CATEGORY_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
};
