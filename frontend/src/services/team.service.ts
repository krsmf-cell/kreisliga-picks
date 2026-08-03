import { api } from "../../api/api";

import type { Team } from "../types";
import type {
  CreateTeamDto,
  UpdateTeamDto,
} from "../dto";

export async function getTeams(): Promise<Team[]> {
  const res = await api.get("/teams");
  return res.data;
}

export async function getTeam(id: number): Promise<Team> {
  const res = await api.get(`/teams/${id}`);
  return res.data;
}

export async function createTeam(
  data: CreateTeamDto
): Promise<Team> {
  const res = await api.post("/teams", data);
  return res.data;
}

export async function updateTeam(
  id: number,
  data: UpdateTeamDto
): Promise<Team> {
  const res = await api.patch(`/teams/${id}`, data);
  return res.data;
}

export async function deleteTeam(
  id: number
): Promise<void> {
  await api.delete(`/teams/${id}`);
}