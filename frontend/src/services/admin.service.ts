import { api } from "../../api/api";

export async function resetSeason() {

  const { data } = await api.post(
    "/admin/reset/season",
  );

  return data;

}