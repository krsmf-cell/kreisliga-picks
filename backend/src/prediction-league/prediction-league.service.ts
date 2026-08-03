import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../users/entities/user.entity";
import { Season } from "../seasons/entities/season.entity";
import { Matchday } from "../matchdays/entities/matchday.entity";
import { Prediction } from "../predictions/entities/prediction.entity";
import { PredictionFixture } from "./entities/prediction-fixture.entity";
import { RoundRobinService } from "./services/round-robin.service";

@Injectable()
export class PredictionLeagueService {

  constructor(

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Season)
    private readonly seasonRepo: Repository<Season>,

    @InjectRepository(Matchday)
    private readonly matchdayRepo: Repository<Matchday>,

    @InjectRepository(PredictionFixture)
    private readonly fixtureRepo: Repository<PredictionFixture>,

@InjectRepository(Prediction)
private readonly predictionRepo: Repository<Prediction>,

    private readonly roundRobin: RoundRobinService,

  ) {}

  async generateSchedule() {

    const season = await this.seasonRepo.findOne({
      where: {
        active: true,
      },
    });

    if (!season) {
      throw new Error(
        "Keine aktive Saison gefunden.",
      );
    }

    const matchdays =
      await this.matchdayRepo.find({
        where: {
          season: {
            id: season.id,
          },
        },
        order: {
          number: "ASC",
        },
      });

    if (matchdays.length === 0) {
      throw new Error(
        "Keine Spieltage vorhanden.",
      );
    }

    const users =
      await this.userRepo.find({
        order: {
          username: "ASC",
        },
      });

    if (users.length < 2) {
      throw new Error(
        "Zu wenige Benutzer.",
      );
    }

    // Alte Paarungen löschen
    await this.fixtureRepo.delete({
      season: {
        id: season.id,
      },
    });

    // Round Robin erzeugen
    const rounds =
      this.roundRobin.generate(users);

    const fixtures: PredictionFixture[] = [];

    for (
      let round = 0;
      round < rounds.length;
      round++
    ) {

      const matchday =
        matchdays[round];

      if (!matchday) {
        break;
      }

      for (const [
        homeUser,
        awayUser,
      ] of rounds[round]) {

        fixtures.push(
          this.fixtureRepo.create({

            season,

            matchday,

            homeUser,

            awayUser,

            homeGoals: 0,

            awayGoals: 0,

            played: false,

          }),
        );

      }

    }

    await this.fixtureRepo.save(fixtures);

    return {

      success: true,

      season: season.name,

      users: users.length,

      matchdays: rounds.length,

      fixtures: fixtures.length,

    };

  }

  async getFixtures() {

    return this.fixtureRepo.find({

      order: {

        matchday: {

          number: "ASC",

        },

      },

    });

  }
async calculateMatchday(
  matchdayId: number,
) {

  const fixtures =
    await this.fixtureRepo.find({

      where: {
        matchday: {
          id: matchdayId,
        },
      },

      relations: {
        homeUser: true,
        awayUser: true,
        matchday: true,
      },

    });

  for (const fixture of fixtures) {

    const homePredictions =
      await this.predictionRepo.find({

        where: {

          user: {
            id: fixture.homeUser.id,
          },

          match: {
            matchday: {
              id: matchdayId,
            },
          },

        },

      });

    const awayPredictions =
      await this.predictionRepo.find({

        where: {

          user: {
            id: fixture.awayUser.id,
          },

          match: {
            matchday: {
              id: matchdayId,
            },
          },

        },

      });

    const homeGoals =
      homePredictions.reduce(

        (sum, prediction) =>

          sum + prediction.points,

        0,

      );

    const awayGoals =
      awayPredictions.reduce(

        (sum, prediction) =>

          sum + prediction.points,

        0,

      );

    fixture.homeGoals =
      homeGoals;

    fixture.awayGoals =
      awayGoals;

    fixture.played =
      true;

    await this.fixtureRepo.save(
      fixture,
    );

  }

}
async getTable() {

  const users = await this.userRepo.find({
    order: {
      username: "ASC",
    },
  });

  const fixtures = await this.fixtureRepo.find({
    where: {
      played: true,
    },
    relations: {
      homeUser: true,
      awayUser: true,
    },
  });

  const table = users.map(user => ({
    id: user.id,
    user,

    games: 0,

    wins: 0,
    draws: 0,
    losses: 0,

    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,

    points: 0,
  }));

  for (const fixture of fixtures) {

    const home = table.find(
      p => p.user.id === fixture.homeUser.id,
    )!;

    const away = table.find(
      p => p.user.id === fixture.awayUser.id,
    )!;

    home.games++;
    away.games++;

    home.goalsFor += fixture.homeGoals;
    home.goalsAgainst += fixture.awayGoals;

    away.goalsFor += fixture.awayGoals;
    away.goalsAgainst += fixture.homeGoals;

    if (fixture.homeGoals > fixture.awayGoals) {

      home.wins++;
      home.points += 3;

      away.losses++;

    }
    else if (fixture.homeGoals < fixture.awayGoals) {

      away.wins++;
      away.points += 3;

      home.losses++;

    }
    else {

      home.draws++;
      away.draws++;

      home.points++;
      away.points++;

    }

  }

  for (const player of table) {

    player.goalDifference =
      player.goalsFor -
      player.goalsAgainst;

  }

  table.sort((a, b) => {

    if (b.points !== a.points) {
      return b.points - a.points;
    }

    if (
      b.goalDifference !==
      a.goalDifference
    ) {
      return (
        b.goalDifference -
        a.goalDifference
      );
    }

    return (
      b.goalsFor -
      a.goalsFor
    );

  });

  return table;

}
}