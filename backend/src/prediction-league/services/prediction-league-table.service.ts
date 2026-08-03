import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Season } from "../../seasons/entities/season.entity";

import { PredictionFixture } from "../entities/prediction-fixture.entity";
import { PredictionTable } from "../entities/prediction-table.entity";

@Injectable()
export class PredictionLeagueTableService {

  constructor(

    @InjectRepository(PredictionFixture)
    private readonly fixtureRepo: Repository<PredictionFixture>,

    @InjectRepository(PredictionTable)
    private readonly tableRepo: Repository<PredictionTable>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,

  ) {}

  async rebuild() {

   const season = await this.seasonRepo.find({
    order: {
        id: "DESC",
    },
    take: 1,
});

if (season.length === 0) {
    return [];
}

const currentSeason = season[0];

    const users = await this.userRepo.find({
      where: {
        predictionLeague: true,
      },
    });

    const fixtures = await this.fixtureRepo.find({
      where: {
        season: {
          id: currentSeason.id,
        },
      },
      relations: {
        season: true,
        homeUser: true,
        awayUser: true,
      },
    });

    await this.tableRepo
  .createQueryBuilder()
  .delete()
  .from(PredictionTable)
  .where("seasonId = :seasonId", {
    seasonId: currentSeason.id,
  })
  .execute();

    const table = new Map<number, PredictionTable>();

    // Alle Spieler anlegen
    for (const user of users) {

      table.set(
        user.id,
        this.createRow(
          currentSeason,
          user,
        ),
      );

    }

    // Ergebnisse auswerten
    for (const fixture of fixtures) {

      if (!fixture.played) {
        continue;
      }

      const home = table.get(fixture.homeUser.id);

      const away = table.get(fixture.awayUser.id);

      if (!home || !away) {
        continue;
      }

      this.applyFixture(
        home,
        away,
        fixture,
      );

    }

    await this.tableRepo.save(
      [...table.values()],
    );

    return this.getTable();

  }

  private createRow(
    season: Season,
    user: User,
  ): PredictionTable {

    return this.tableRepo.create({

      season,

      user,

      games: 0,

      wins: 0,

      draws: 0,

      losses: 0,

      goalsFor: 0,

      goalsAgainst: 0,

      goalDifference: 0,

      points: 0,

      lastFive: [],

    });

  }

  private applyFixture(
    home: PredictionTable,
    away: PredictionTable,
    fixture: PredictionFixture,
  ) {

    home.games++;
    away.games++;

    home.goalsFor += fixture.homeGoals;
    home.goalsAgainst += fixture.awayGoals;

    away.goalsFor += fixture.awayGoals;
    away.goalsAgainst += fixture.homeGoals;

    home.goalDifference =
      home.goalsFor - home.goalsAgainst;

    away.goalDifference =
      away.goalsFor - away.goalsAgainst;

    if (fixture.homeGoals > fixture.awayGoals) {

      home.wins++;
      away.losses++;

      home.points += 3;

      home.lastFive.push("W");
      away.lastFive.push("L");

    } else if (fixture.homeGoals < fixture.awayGoals) {

      away.wins++;
      home.losses++;

      away.points += 3;

      away.lastFive.push("W");
      home.lastFive.push("L");

    } else {

      home.draws++;
      away.draws++;

      home.points++;
      away.points++;

      home.lastFive.push("D");
      away.lastFive.push("D");

    }

    home.lastFive = home.lastFive.slice(-5);
    away.lastFive = away.lastFive.slice(-5);

  }

  async getTable() {

    return this.tableRepo.find({

      relations: {
        user: true,
      },

      order: {
        points: "DESC",
        goalDifference: "DESC",
        goalsFor: "DESC",
        wins: "DESC",
      },

    });

  }

}