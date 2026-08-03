export interface TeamStanding {
  teamId: number;
  teamName: string;

  played: number;

  wins: number;
  draws: number;
  losses: number;

  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;

  points: number;

  homePoints: number;
  awayPoints: number;

  homeGoals: number;
  awayGoals: number;

  form: string[];

  rating: number;
}