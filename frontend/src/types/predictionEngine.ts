export interface MatchPrediction {

  homeChance: number;
  drawChance: number;
  awayChance: number;

  homeOdds: number;
  drawOdds: number;
  awayOdds: number;

  homePoints: number;
  drawPoints: number;
  awayPoints: number;

  communityHome: number;
  communityDraw: number;
  communityAway: number;

  homeLastFive: ("W" | "D" | "L")[];
  awayLastFive: ("W" | "D" | "L")[];

}