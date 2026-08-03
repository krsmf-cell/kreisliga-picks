import type { Matchday } from "./matchday";
import type { Team } from "./team";

export interface Match {

  id: number;

  matchday: Matchday;

  homeTeam: Team;

  awayTeam: Team;

  kickoff: string;

  homeGoals: number;

  awayGoals: number;

  status: string;

  location?: string;
}