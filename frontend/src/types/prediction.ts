export type PredictionResult =
  | "HOME"
  | "DRAW"
  | "AWAY";

export interface Prediction {
  id: number;

  match: {
    id: number;
  };

  choice: PredictionResult;
}