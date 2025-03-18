import { Ad } from "@/types";
import axios from "axios";

// Define the Pagination type
type Pagination = {
  page: number;
  limit: number;
  total: number;
};

// Define the response type for getAllAds
type GetAllAdsResponse = {
  data: Ad[];
  pagination: Pagination;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AD_URL = "/ads";

// Fetch all ads with pagination
export const getAllAds = async (
  page: number = 1,
  limit: number = 10
): Promise<GetAllAdsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllAdsResponse>(AD_URL, {
      params: { page, limit },
    });
    return (
      response?.data ?? { data: [], pagination: { page, limit, total: 0 } }
    );
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw new Error("Failed to fetch ads");
  }
};

// Fetch an ad by ID
export const getAdById = async (id: string): Promise<Ad> => {
  try {
    const response = await axiosInstance.get<Ad>(`${AD_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ad by ID:", error);
    throw new Error("Failed to fetch ad");
  }
};

// Create a new ad
export const createAd = async (data: {
  type: "image" | "video";
  mediaUrl: string;
  isActive?: boolean;
}): Promise<Ad> => {
  try {
    const response = await axiosInstance.post<Ad>(AD_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating ad:", error);
    throw new Error("Failed to create ad");
  }
};

// Update an existing ad
export const updateAd = async (data: {
  _id: string;
  type: "image" | "video";
  mediaUrl: string;
  isActive?: boolean;
}): Promise<Ad> => {
  try {
    const response = await axiosInstance.put<Ad>(`${AD_URL}/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ad:", error);
    throw new Error("Failed to update ad");
  }
};

// Delete an ad
export const deleteAd = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${AD_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting ad:", error);
    throw new Error("Failed to delete ad");
  }
};
