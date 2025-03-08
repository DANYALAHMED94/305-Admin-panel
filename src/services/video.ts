import axios from "axios";
import { Video, VideoFull } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const VIDEO_URL = "/video";

// Fetch all recorded videos
export const getAllRecordedVideos = async (
  page: number,
  limit: number,
  search?: string
): Promise<{
  videos: VideoFull[];
  totalPages: number;
  currentPage: number;
  totalVideos: number;
}> => {
  try {
    const response = await axiosInstance.get(`${VIDEO_URL}/recorded`, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recorded videos:", error);
    throw new Error("Failed to fetch recorded videos");
  }
};

// Fetch all live videos
export const getAllLiveVideos = async (
  page: number,
  limit: number,
  search?: string
): Promise<{
  videos: VideoFull[];
  totalPages: number;
  currentPage: number;
  totalVideos: number;
}> => {
  try {
    const response = await axiosInstance.get(`${VIDEO_URL}/live`, {
      params: { page, limit, search },
    });
    return (
      response?.data ?? {
        videos: [],
        totalPages: 0,
        currentPage: 1,
        totalVideos: 0,
      }
    );
  } catch (error) {
    console.error("Error fetching live videos:", error);
    throw new Error("Failed to fetch live videos");
  }
};

// Fetch a video by ID
export const getVideoById = async (id: string): Promise<Video> => {
  try {
    const response = await axiosInstance.get(`${VIDEO_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    throw new Error("Failed to fetch video");
  }
};

// Create a new recorded video
export const createRecordedVideo = async (
  data: Partial<Video>
): Promise<Video> => {
  try {
    const response = await axiosInstance.post(`${VIDEO_URL}/recorded`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating recorded video:", error);
    throw new Error("Failed to create recorded video");
  }
};

// Create a new live video
export const createLiveVideo = async (data: Partial<Video>): Promise<Video> => {
  try {
    const response = await axiosInstance.post(`${VIDEO_URL}/live`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating live video:", error);
    throw new Error("Failed to create live video");
  }
};

// Update an existing video
export const updateVideo = async (
  id: string,
  data: Partial<Video>
): Promise<Video> => {
  try {
    const response = await axiosInstance.put(`${VIDEO_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
    throw new Error("Failed to update video");
  }
};

// Delete a video
export const deleteVideo = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${VIDEO_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting video:", error);
    throw new Error("Failed to delete video");
  }
};
