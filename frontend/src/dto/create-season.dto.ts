export interface CreateSeasonDto {
  name: string;
  leagueId: number;
  startDate: string;
  endDate: string;
  active: boolean;
}