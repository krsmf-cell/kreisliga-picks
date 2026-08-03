import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Team } from "../teams/entities/team.entity";
import { Match, MatchStatus } from "../matches/entities/match.entity";
import { Season } from "../seasons/entities/season.entity";
import { TeamStatistics } from "./entities/team-statistics.entity";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TeamStatistics)
    private readonly repo: Repository<TeamStatistics>,

    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,

    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,

    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,
  ) {}

  async rebuild() {
    const season = await this.seasonRepo.findOne({
      where: {
        active: true,
      },
      relations: {
        league: true,
      },
    });

    if (!season) {
      return {
        success: false,
        message: "Keine aktive Saison gefunden.",
      };
    }

    const teams = await this.teamRepo.find({
      where: {
        league: {
          id: season.league.id,
        },
      },
    });

    // Alte Statistik löschen
    await this.repo.delete({
      season: {
        id: season.id,
      },
    });

    // Statistikobjekte erzeugen
    const statistics = new Map<number, TeamStatistics>();

    for (const team of teams) {
      statistics.set(
        team.id,
        this.repo.create({
          team,
          season,

          games: 0,
          wins: 0,
          draws: 0,
          losses: 0,

          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,

          points: 0,
          elo: 1500,

          homeGames: 0,
          awayGames: 0,

          homeWins: 0,
          awayWins: 0,

          homeGoals: 0,
          awayGoals: 0,

          homePoints: 0,
          awayPoints: 0,

          goalsPerGame: 0,
          goalsAgainstPerGame: 0,

          cleanSheets: 0,
          failedToScore: 0,

          lastFive: [],
        }),
      );
    }

    // Alle beendeten Spiele laden
    const matches = await this.matchRepo.find({
      where: {
        status: MatchStatus.FINISHED,
        matchday: {
          season: {
            id: season.id,
          },
        },
      },
      relations: {
        homeTeam: true,
        awayTeam: true,
      },
      order: {
        kickoff: "ASC",
      },
    });

    // Spiele auswerten
    for (const match of matches) {
      const home = statistics.get(match.homeTeam.id);
      const away = statistics.get(match.awayTeam.id);

      if (!home || !away) {
        continue;
      }

      // Spiele
      home.games++;
      away.games++;

      // Heim / Auswärts
      home.homeGames++;
      away.awayGames++;

      // Tore
      home.goalsFor += Number(match.homeGoals);
      home.goalsAgainst += Number(match.awayGoals);

      away.goalsFor += Number(match.awayGoals);
      away.goalsAgainst += Number(match.homeGoals);

      home.homeGoals += Number(match.homeGoals);
      away.awayGoals += Number(match.awayGoals);

      // Clean Sheets
      if (match.awayGoals === 0) {
        home.cleanSheets++;
      }

      if (match.homeGoals === 0) {
        away.cleanSheets++;
      }

      // Ohne Tor geblieben
      if (match.homeGoals === 0) {
        home.failedToScore++;
      }

      if (match.awayGoals === 0) {
        away.failedToScore++;
      }

      // Sieger
      if (match.homeGoals > match.awayGoals) {
        home.wins++;
        home.homeWins++;

        home.points += 3;
        home.homePoints += 3;

        away.losses++;

        home.lastFive.push("W");
        away.lastFive.push("L");
      } else if (match.homeGoals < match.awayGoals) {
        away.wins++;
        away.awayWins++;

        away.points += 3;
        away.awayPoints += 3;

        home.losses++;

        away.lastFive.push("W");
        home.lastFive.push("L");
      } else {
        home.draws++;
        away.draws++;

        home.points++;
        away.points++;

        home.homePoints++;
        away.awayPoints++;

        home.lastFive.push("D");
        away.lastFive.push("D");
      }
    }

    // Werte berechnen
    for (const stats of statistics.values()) {
      stats.goalDifference =
        stats.goalsFor - stats.goalsAgainst;

      if (stats.games > 0) {
        stats.goalsPerGame = Number(
          (stats.goalsFor / stats.games).toFixed(2),
        );

        stats.goalsAgainstPerGame = Number(
          (stats.goalsAgainst / stats.games).toFixed(2),
        );
      }

      if (stats.lastFive.length > 5) {
        stats.lastFive = stats.lastFive.slice(-5);
      }
    }
    for (const stats of statistics.values()) {
  stats.lastFive = stats.lastFive.slice(-5);
    }
    await this.repo.save(
      [...statistics.values()],
    );

    return {
      success: true,
      teams: teams.length,
      matches: matches.length,
    };
  }

  async getStandings() {
    return this.repo.find({
      relations: {
        team: true,
        season: true,
      },
      order: {
        points: "DESC",
        goalDifference: "DESC",
        goalsFor: "DESC",
        goalsAgainst: "ASC",
      },
    });
  }
}