export interface CreateMatchDto {
  matchdayId: number;

  homeTeamId: number;

  awayTeamId: number;

  kickoff: string;

  homeGoals: number;

  awayGoals: number;

  status: string;

  location?: string;
}