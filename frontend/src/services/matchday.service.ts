import { api } from "../../api/api";

export async function getMatchdays() {
  const res = await api.get("/matchdays");
  return res.data;
}

export async function createMatchday(data: {
  number: number;
  seasonId: number;
  deadline: string;
  active: boolean;
}) {
  const res = await api.post("/matchdays", data);
  return res.data;
}

export async function updateMatchday(
  id: number,
  data: {
    number: number;
    seasonId: number;
    deadline: string;
    active: boolean;
  }
) {
  const res = await api.patch(`/matchdays/${id}`, data);
  return res.data;
}
export async function getCurrentMatchday() {
  const res = await api.get("/matchdays/current");
  return res.data;
}
export async function deleteMatchday(id: number) {
  await api.delete(`/matchdays/${id}`);
}