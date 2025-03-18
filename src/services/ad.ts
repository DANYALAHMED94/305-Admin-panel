import { Ad } from "@/types";
import axios from "axios";

// Define the Pagination type
type Pagination = {
  page: number;
  limit: number;
  total: number;
};

// Define the response type for getAllAds and searchAds
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

/**
 * Fetch all ads with pagination
 * @param page - Page number (default: 1)
 * @param limit - Number of items per page (default: 10)
 * @returns Promise<GetAllAdsResponse>
 */
export const getAllAds = async (
  page: number = 1,
  limit: number = 10
): Promise<GetAllAdsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllAdsResponse>(AD_URL, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw new Error("Failed to fetch ads");
  }
};

/**
 * Search ads with a keyword, pagination, and limit
 * @param search - Search keyword
 * @param page - Page number (default: 1)
 * @param limit - Number of items per page (default: 10)
 * @returns Promise<GetAllAdsResponse>
 */
export const searchAds = async (
  search: string,
  page: number = 1,
  limit: number = 10
): Promise<GetAllAdsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllAdsResponse>(
      `${AD_URL}/search`,
      {
        params: { search, page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching ads:", error);
    throw new Error("Failed to search ads");
  }
};

/**
 * Fetch an ad by ID
 * @param id - Ad ID
 * @returns Promise<Ad>
 */
export const getAdById = async (id: string): Promise<Ad> => {
  try {
    const response = await axiosInstance.get<Ad>(`${AD_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ad by ID:", error);
    throw new Error("Failed to fetch ad");
  }
};

/**
 * Create a new ad
 * @param data - Ad data
 * @returns Promise<Ad>
 */
export const createAd = async (data: {
  title: string;
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

/**
 * Update an existing ad
 * @param data - Ad data including _id
 * @returns Promise<Ad>
 */
export const updateAd = async (data: {
  _id: string;
  title: string;
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

/**
 * Delete an ad by ID
 * @param id - Ad ID
 * @returns Promise<void>
 */
export const deleteAd = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${AD_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting ad:", error);
    throw new Error("Failed to delete ad");
  }
};
