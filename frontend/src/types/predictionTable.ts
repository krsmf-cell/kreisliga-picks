export interface PredictionTable {

  id: number;

  user: {
    id: number;
    username: string;
  };

  games: number;

  wins: number;

  draws: number;

  losses: number;

  goalsFor: number;

  goalsAgainst: number;

  goalDifference: number;

  points: number;

  lastFive: ("W" | "D" | "L")[];

}