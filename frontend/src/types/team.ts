import type { League } from "./league";

export interface Team {
  id: number;

  name: string;

  shortName: string;

   logo?: string;

  active: boolean;

  league: League;
}