import { Injectable } from "@nestjs/common";

import { TeamStatistics } from "../../statistics/entities/team-statistics.entity";

@Injectable()
export class ProbabilityService {

  calculate(
    home: TeamStatistics,
    away: TeamStatistics,
  ) {

    let homeScore = 50;
    let awayScore = 50;

    // Heimbonus
    homeScore += 10;

    // Punkte
    homeScore +=
      (home.points - away.points) * 1.5;

    awayScore +=
      (away.points - home.points) * 1.5;

    // Tordifferenz
    homeScore +=
      (home.goalDifference - away.goalDifference) * 0.5;

    awayScore +=
      (away.goalDifference - home.goalDifference) * 0.5;

    // Tore pro Spiel
    homeScore +=
      home.goalsPerGame * 2;

    awayScore +=
      away.goalsPerGame * 2;

    homeScore = Math.max(homeScore, 1);
    awayScore = Math.max(awayScore, 1);

    const total =
      homeScore + awayScore;

    const drawChance = 20;

    const homeChance =
      Math.round(
        (homeScore / total) *
        (100 - drawChance),
      );

    const awayChance =
      100 -
      drawChance -
      homeChance;

    return {
      homeChance,
      drawChance,
      awayChance,
    };
  }

}