import type { Team } from "../types/team";

export function calculateOdds(_home: Team, _away: Team) {
  return {
    home: 40,
    draw: 30,
    away: 30,
  };
}