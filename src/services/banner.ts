import axios from "axios";
import { Banner, BannerFull } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const BANNER_URL = "/banners";

// Fetch all banners
export const getAllBanners = async (): Promise<BannerFull[]> => {
  try {
    const response = await axiosInstance.get(BANNER_URL);
    return (response?.data as BannerFull[]) ?? [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw new Error("Failed to fetch banners");
  }
};

// Fetch a banner by ID
export const getBannerById = async (id: string): Promise<Banner> => {
  try {
    const response = await axiosInstance.get(`${BANNER_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banner by ID:", error);
    throw new Error("Failed to fetch banner");
  }
};

// Create a new banner
export const createBanner = async (data: {
  imageUrl: string;
  videoId: string;
}): Promise<Banner> => {
  try {
    const response = await axiosInstance.post(BANNER_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw new Error("Failed to create banner");
  }
};

// Update an existing banner
export const updateBanner = async (data: {
  _id: string;
  imageUrl?: string;
  videoId?: string;
  isActive?: boolean;
}): Promise<Banner> => {
  try {
    const response = await axiosInstance.put(`${BANNER_URL}/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw new Error("Failed to update banner");
  }
};

// Activate a banner
export const activateBanner = async (id: string): Promise<Banner> => {
  try {
    const response = await axiosInstance.patch(`${BANNER_URL}/${id}/activate`);
    return response.data;
  } catch (error) {
    console.error("Error activating banner:", error);
    throw new Error("Failed to activate banner");
  }
};

// Deactivate a banner
export const deactivateBanner = async (id: string): Promise<Banner> => {
  try {
    const response = await axiosInstance.patch(
      `${BANNER_URL}/${id}/deactivate`
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating banner:", error);
    throw new Error("Failed to deactivate banner");
  }
};

// Delete a banner
export const deleteBanner = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${BANNER_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw new Error("Failed to delete banner");
  }
};
