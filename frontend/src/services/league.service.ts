import { api } from "../../api/api";

export async function getLeagues() {
  const res = await api.get("/leagues");
  return res.data;
}

export async function createLeague(data: {
  name: string;
  code: string;
  isPublic: boolean;
}) {
  const res = await api.post("/leagues", data);
  return res.data;
}

export async function updateLeague(
  id: number,
  data: {
    name: string;
    code: string;
    isPublic: boolean;
  }
) {
  const res = await api.patch(`/leagues/${id}`, data);
  return res.data;
}

export async function deleteLeague(id: number) {
  await api.delete(`/leagues/${id}`);
}