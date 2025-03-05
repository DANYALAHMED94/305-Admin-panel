import axios from "axios";
import { Team } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const TEAM_URL = `${API_URL}/team`;

// Get all teams
export const getAllTeams = async (): Promise<Team[]> => {
  const response = await axios.get<Team[]>(TEAM_URL);
  return response.data;
};

// Get a team by ID
export const getTeamById = async (id: string): Promise<Team> => {
  const response = await axios.get<Team>(`${TEAM_URL}/${id}`);
  return response.data;
};

// Get teams by sport ID
export const getTeamsBySport = async (sportId: string): Promise<Team[]> => {
  const response = await axios.get<Team[]>(`${TEAM_URL}/by-sport/${sportId}`);
  return response.data;
};

// Create a new team
export const createTeam = async (teamData: Partial<Team>): Promise<Team> => {
  const response = await axios.post<Team>(TEAM_URL, teamData);
  return response.data;
};

// Update an existing team
export const updateTeam = async ({
  id,
  teamData,
}: {
  id: string;
  teamData: Partial<Team>;
}): Promise<Team> => {
  const response = await axios.put<Team>(`${TEAM_URL}/${id}`, {
    ...teamData,
  });
  return response.data;
};

// Delete a team
export const deleteTeam = async (id: string): Promise<void> => {
  await axios.delete(`${TEAM_URL}/${id}`);
};
