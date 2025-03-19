import axios from "axios";
import { Video } from "@/types"; // Assuming you have a Video type defined

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const LIVE_NOW_URL = "/live-now";

// Add a video to the live now section
export const addLiveNowVideo = async (videoId: string): Promise<void> => {
  try {
    await axiosInstance.post(LIVE_NOW_URL, { videoId });
  } catch (error) {
    console.error("Error adding live now video:", error);
    throw new Error("Failed to add live now video");
  }
};

// Remove a video from the live now section
export const removeLiveNowVideo = async (videoId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${LIVE_NOW_URL}/${videoId}`);
  } catch (error) {
    console.error("Error removing live now video:", error);
    throw new Error("Failed to remove live now video");
  }
};

// Get all live now videos
export const getLiveNowVideos = async (): Promise<Video[]> => {
  try {
    const response = await axiosInstance.get(LIVE_NOW_URL);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching live now videos:", error);
    throw new Error("Failed to fetch live now videos");
  }
};

type GetAllVideosResponse = {
  data: (Video & { isLiveNow: boolean })[];
  pagination: { page: number; limit: number; total: number };
};

// Get all videos with isLiveNow field
export const getAllVideos = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<GetAllVideosResponse> => {
  try {
    const response = await axiosInstance.get(`${LIVE_NOW_URL}/videos`, {
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
