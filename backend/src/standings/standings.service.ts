import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Match } from "../matches/entities/match.entity";

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Match)
    private readonly repo: Repository<Match>,
  ) {}

  async getTable() {
    const matches = await this.repo.find({
      where: { finished: true } as any,
      relations: {
        homeTeam: true,
        awayTeam: true,
      },
    });

    const table = new Map<number, any>();

    for (const match of matches) {
      if (!table.has(match.homeTeam.id)) {
        table.set(match.homeTeam.id, {
          team: match.homeTeam,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        });
      }

      if (!table.has(match.awayTeam.id)) {
        table.set(match.awayTeam.id, {
          team: match.awayTeam,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        });
      }

      const home = table.get(match.homeTeam.id);
      const away = table.get(match.awayTeam.id);

      home.played++;
      away.played++;

      home.goalsFor += match.homeGoals;
      home.goalsAgainst += match.awayGoals;

      away.goalsFor += match.awayGoals;
      away.goalsAgainst += match.homeGoals;

      if (match.homeGoals > match.awayGoals) {
        home.wins++;
        home.points += 3;

        away.losses++;
      } else if (match.homeGoals < match.awayGoals) {
        away.wins++;
        away.points += 3;

        home.losses++;
      } else {
        home.draws++;
        away.draws++;

        home.points++;
        away.points++;
      }
    }

    const standings = Array.from(table.values());

    standings.forEach((team) => {
      team.goalDifference =
        team.goalsFor - team.goalsAgainst;
    });

    standings.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }

      return b.goalsFor - a.goalsFor;
    });

    return standings;
  }
}