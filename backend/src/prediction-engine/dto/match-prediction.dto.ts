export class MatchPredictionDto {

  homeChance!: number;
  drawChance!: number;
  awayChance!: number;

  homeOdds!: number;
  drawOdds!: number;
  awayOdds!: number;

  communityHome!: number;
  communityDraw!: number;
  communityAway!: number;

  favorite!: "HOME" | "DRAW" | "AWAY";
}