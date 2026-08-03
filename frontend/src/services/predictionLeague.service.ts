import { api } from "../../api/api";

export async function generatePredictionLeague() {
  const { data } = await api.post(
    "/prediction-league/generate",
  );

  return data;
}

export async function getFixtures() {
  const { data } = await api.get(
    "/prediction-league/fixtures",
  );

  return data;
}

export async function getPredictionTable() {
  const { data } = await api.get(
    "/prediction-league/table",
  );

  return data;
}