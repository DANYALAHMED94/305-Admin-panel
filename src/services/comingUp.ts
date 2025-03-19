import axios from "axios";
import { Video } from "@/types"; // Assuming you have a Video type defined

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const COMING_UP_URL = "/coming-up";

// Add a video to the coming up section
export const addComingUpVideo = async (videoId: string): Promise<void> => {
  try {
    await axiosInstance.post(COMING_UP_URL, { videoId });
  } catch (error) {
    console.error("Error adding coming up video:", error);
    throw new Error("Failed to add coming up video");
  }
};

// Remove a video from the coming up section
export const removeComingUpVideo = async (videoId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${COMING_UP_URL}/${videoId}`);
  } catch (error) {
    console.error("Error removing coming up video:", error);
    throw new Error("Failed to remove coming up video");
  }
};

// Get all coming up videos
export const getComingUpVideos = async (): Promise<Video[]> => {
  try {
    const response = await axiosInstance.get(COMING_UP_URL);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching coming up videos:", error);
    throw new Error("Failed to fetch coming up videos");
  }
};

type GetAllVideosResponse = {
  data: (Video & { isComingUp: boolean })[];
  pagination: { page: number; limit: number; total: number };
};

// Get all videos with isComingUp field
export const getAllVideos = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<GetAllVideosResponse> => {
  try {
    const response = await axiosInstance.get(`${COMING_UP_URL}/videos`, {
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
