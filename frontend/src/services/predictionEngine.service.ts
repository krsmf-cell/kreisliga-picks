import { api } from "../../api/api";

export async function getPrediction(
  matchId: number,
) {

  const { data } = await api.get(
    `/prediction-engine/${matchId}`,
  );

  return data;

}