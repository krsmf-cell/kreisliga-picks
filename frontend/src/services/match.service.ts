import { api } from "../../api/api";

import type { Match } from "../types";
import type {
  CreateMatchDto,
  UpdateMatchDto,
} from "../dto";

export async function getMatches(): Promise<Match[]> {
  const res = await api.get("/matches");
  return res.data;
}

export async function getMatch(id: number): Promise<Match> {
  const res = await api.get(`/matches/${id}`);
  return res.data;
}

export async function createMatch(
  data: CreateMatchDto,
): Promise<Match> {
  const res = await api.post("/matches", data);
  return res.data;
}

export async function updateMatch(
  id: number,
  data: UpdateMatchDto,
): Promise<Match> {
  const res = await api.patch(`/matches/${id}`, data);
  return res.data;
}

export async function deleteMatch(
  id: number,
): Promise<void> {
  await api.delete(`/matches/${id}`);
}
export async function getMatchesByMatchday(
  matchdayId: number,
) {
  const res = await api.get(
    `/matches/matchday/${matchdayId}`,
  );

  return res.data;

  
}
export async function updateResult(
  id: number,
  homeGoals: number,
  awayGoals: number,
) {

  const { data } = await api.patch(

    `/matches/${id}/result`,

    {
      homeGoals,
      awayGoals,
    },

  );

  return data;

}