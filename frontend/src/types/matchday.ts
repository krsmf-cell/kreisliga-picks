import type { Season } from "./season";

export interface Matchday {
  id: number;

  number: number;

  season: Season;

  deadline: string;

  active: boolean;
}