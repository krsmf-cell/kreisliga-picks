import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Match, MatchStatus } from "../matches/entities/match.entity";
import { Prediction } from "../predictions/entities/prediction.entity";
import { PredictionFixture } from "../prediction-league/entities/prediction-fixture.entity";
import { Team } from "../teams/entities/team.entity";

@Injectable()
export class AdminResetService {

  constructor(

    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,

    @InjectRepository(Prediction)
    private readonly predictionRepo: Repository<Prediction>,

    @InjectRepository(PredictionFixture)
    private readonly fixtureRepo: Repository<PredictionFixture>,

    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,

  ) {}

  async resetSeason() {

    //
    // Spiele zurücksetzen
    //

    const matches = await this.matchRepo.find();

    for (const match of matches) {

      match.homeGoals = 0;
      match.awayGoals = 0;
      match.status = MatchStatus.SCHEDULED;

      await this.matchRepo.save(match);

    }

    //
    // Prediction-Punkte löschen
    //

    const predictions =
      await this.predictionRepo.find();

    for (const prediction of predictions) {

      prediction.points = 0;

      await this.predictionRepo.save(
        prediction,
      );

    }

    //
    // Userduelle zurücksetzen
    //

    const fixtures =
      await this.fixtureRepo.find();

    for (const fixture of fixtures) {

      fixture.homeGoals = 0;
      fixture.awayGoals = 0;
      fixture.played = false;

      await this.fixtureRepo.save(
        fixture,
      );

    }

    //
    // Teams zurücksetzen
    //

    const teams =
      await this.teamRepo.find();

    for (const team of teams) {

      team.rating = 1500;

      team.played = 0;
      team.wins = 0;
      team.draws = 0;
      team.losses = 0;

      team.goalsFor = 0;
      team.goalsAgainst = 0;
      team.goalDifference = 0;

      team.points = 0;

      team.lastFive = [];

      team.homePlayed = 0;
      team.homeWins = 0;

      team.awayPlayed = 0;
      team.awayWins = 0;

      team.currentStreak = 0;

      await this.teamRepo.save(team);

    }

    return {
      success: true,
    };

  }

}