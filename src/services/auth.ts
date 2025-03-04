import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AUTH_URL = API_URL + "/auth";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${AUTH_URL}/login`, data);
  return response.data;
};
