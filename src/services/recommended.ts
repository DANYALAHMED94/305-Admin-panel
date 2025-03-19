import axios from "axios";
import { Video } from "@/types"; // Assuming you have a Video type defined

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const RECOMMENDED_URL = "/recommended";

// Add a video to the recommended section
export const addRecommendedVideo = async (videoId: string): Promise<void> => {
  try {
    await axiosInstance.post(RECOMMENDED_URL, { videoId });
  } catch (error) {
    console.error("Error adding recommended video:", error);
    throw new Error("Failed to add recommended video");
  }
};

// Remove a video from the recommended section
export const removeRecommendedVideo = async (
  videoId: string
): Promise<void> => {
  try {
    await axiosInstance.delete(`${RECOMMENDED_URL}/${videoId}`);
  } catch (error) {
    console.error("Error removing recommended video:", error);
    throw new Error("Failed to remove recommended video");
  }
};

// Get all recommended videos
export const getRecommendedVideos = async (): Promise<Video[]> => {
  try {
    const response = await axiosInstance.get(RECOMMENDED_URL);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching recommended videos:", error);
    throw new Error("Failed to fetch recommended videos");
  }
};

type GetAllVideosResponse = {
  data: (Video & { isRecommended: boolean })[];
  pagination: { page: number; limit: number; total: number };
};

// Get all videos with isRecommended field
export const getAllVideos = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<GetAllVideosResponse> => {
  try {
    const response = await axiosInstance.get(`${RECOMMENDED_URL}/videos`, {
      params: { page, limit, search },
    });
    return (
      response?.data || { data: [], pagination: { page, limit, total: 0 } }
    );
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Failed to fetch videos");
  }
};
