import type { League } from "./league";

export interface Season {
  id: number;

  name: string;

  league: League;

  startDate: string;

  endDate: string;

  active: boolean;
}