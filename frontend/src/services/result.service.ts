import { api } from "../../api/api";

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