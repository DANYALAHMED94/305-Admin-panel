import axios from "axios";

const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const STATS_URL: string = `${API_URL}/stats`;

// Define the expected return type for dashboard stats
interface DashboardStats {
  totalCategories: number;
  totalSubCategories: number;
  totalTeams: number;
  categories: {
    _id: string;
    name: string;
    count: number;
  }[];
  viewsPerCategory: {
    _id: string;
    name: string;
    views: number;
  }[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get<DashboardStats>(`${STATS_URL}/dashboard`);
  return response.data;
};
