import { api } from "../../api/api";

export async function getSeasons() {
  const res = await api.get("/seasons");
  return res.data;
}

export async function createSeason(data: any) {
  const res = await api.post("/seasons", data);
  return res.data;
}

export async function updateSeason(id: number, data: any) {
  const res = await api.patch(`/seasons/${id}`, data);
  return res.data;
}

export async function deleteSeason(id: number) {
  await api.delete(`/seasons/${id}`);
}