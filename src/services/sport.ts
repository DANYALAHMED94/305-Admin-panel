import { Sport } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const SPORT_URL = "/sport";

export const getAllSports = async (): Promise<Sport[]> => {
  try {
    const response = await axiosInstance.get(SPORT_URL);
    return response.data as Sport[];
  } catch (error) {
    console.error("Error fetching sports:", error);
    throw new Error("Failed to fetch sports");
  }
};

export const addSport = async (data: {
  name: string;
  imageUrl?: string;
}): Promise<Sport> => {
  try {
    const response = await axiosInstance.post(SPORT_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding sport:", error);
    throw new Error("Failed to add sport");
  }
};

export const updateSport = async (data: {
  _id: string;
  name: string;
  imageUrl?: string;
}): Promise<Sport> => {
  try {
    const response = await axiosInstance.put(`${SPORT_URL}/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating sport:", error);
    throw new Error("Failed to update sport");
  }
};

export const getSportById = async (id: string): Promise<Sport> => {
  try {
    const response = await axiosInstance.get(`${SPORT_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sport by ID:", error);
    throw new Error("Failed to fetch sport");
  }
};

export const deleteSport = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${SPORT_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting sport:", error);
    throw new Error("Failed to delete sport");
  }
};
