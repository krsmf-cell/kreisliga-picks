import { api } from "../../api/api";

export async function getMyPredictions(
  matchdayId: number,
) {

  const { data } = await api.get(
    `/predictions/matchday/${matchdayId}`,
  );

  return data;

}
export async function getCommunityPrediction(
  matchId: number,
) {

  const { data } = await api.get(
    `/predictions/community/${matchId}`,
  );

  return data;

}
export async function savePredictions(
  predictions: {
    matchId: number;
    choice: string;
  }[],
) {

  const { data } = await api.post(
    "/predictions/save",
    predictions,
  );

  return data;

}