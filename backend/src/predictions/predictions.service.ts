import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatchStatus } from "../matches/entities/match.entity";
import { PredictionChoice } from "./enums/prediction-choice.enum";
import { Prediction } from "./entities/prediction.entity";
import { Match } from "../matches/entities/match.entity";
import { User } from "../users/entities/user.entity";
import { SavePredictionsDto } from "./dto/save-predictions.dto";
import { CreatePredictionDto } from "./dto/create-prediction.dto";
import { UpdatePredictionDto } from "./dto/update-prediction.dto";

@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private readonly repo: Repository<Prediction>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

async findMine(
  userId: number,
  matchdayId: number,
) {
  return this.repo.find({
    where: {
      user: {
        id: userId,
      },
      match: {
        matchday: {
          id: matchdayId,
        },
      },
    },
    relations: {
      match: {
        homeTeam: true,
        awayTeam: true,
        matchday: true,
      },
    },
    order: {
      match: {
        kickoff: "ASC",
      },
    },
  });
}
async getByMatchday(
  userId: number,
  matchdayId: number,
) {

  return this.findMine(
    userId,
    matchdayId,
  );

}
  async create(
    userId: number,
    dto: CreatePredictionDto,
  ) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException("Benutzer nicht gefunden");
    }

    const match = await this.matchRepo.findOne({
      where: {
        id: dto.matchId,
      },
      relations: {
        matchday: true,
      },
    });

    if (!match) {
      throw new NotFoundException("Spiel nicht gefunden");
    }
const now = new Date();

if (match.matchday.deadline <= now) {
  throw new BadRequestException(
    "Die Tippfrist ist bereits abgelaufen.",
  );
}

    const existing = await this.repo.findOne({
      where: {
        user: {
          id: userId,
        },
        match: {
          id: dto.matchId,
        },
      },
    });

    if (existing) {
      existing.choice = dto.choice;
      return this.repo.save(existing);
    }

    const prediction = this.repo.create({
      user,
      match,
      choice: dto.choice,
    });

    return this.repo.save(prediction);
  }

  async update(
    id: number,
    dto: UpdatePredictionDto,
  ) {
    const prediction = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!prediction) {
      throw new NotFoundException("Tipp nicht gefunden");
    }

    if (dto.choice !== undefined) {
      prediction.choice = dto.choice;
    }

    return this.repo.save(prediction);
  }

  async remove(id: number) {
    const prediction = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!prediction) {
      throw new NotFoundException("Tipp nicht gefunden");
    }

    await this.repo.remove(prediction);

    return {
      success: true,
    };
  }
  async saveMany(
  userId: number,
  predictions: CreatePredictionDto[],
) {
    const result: Prediction[] = [];

  for (const prediction of predictions) {
    result.push(
      await this.create(userId, prediction),
    );
  }

  return result;
}
async savePredictions(
  userId: number,
  body: CreatePredictionDto[],
) {

  return this.saveMany(
    userId,
    body,
  );

}
private getPoints(
  match: Match,
  choice: PredictionChoice,
): number {

  switch (choice) {

    case PredictionChoice.HOME:
      return match.homePoints;

    case PredictionChoice.DRAW:
      return match.drawPoints;

    case PredictionChoice.AWAY:
      return match.awayPoints;

    default:
      return 0;

  }

}
async calculateMatch(matchId: number) {

  const match = await this.matchRepo.findOne({
    where: {
      id: matchId,
    },
  });

  if (!match) {
    throw new NotFoundException(
      "Spiel nicht gefunden",
    );
  }

  if (match.status !== MatchStatus.FINISHED) {
    return;
  }

  let result: PredictionChoice;

  if (match.homeGoals > match.awayGoals) {
    result = PredictionChoice.HOME;
  } else if (match.homeGoals < match.awayGoals) {
    result = PredictionChoice.AWAY;
  } else {
    result = PredictionChoice.DRAW;
  }

  const predictions = await this.repo.find({
    where: {
      match: {
        id: matchId,
      },
    },
  });

for (const prediction of predictions) {

  if (prediction.choice === result) {

    prediction.points = this.getPoints(
      match,
      prediction.choice,
    );

  } else {

    prediction.points = 0;

  }

  await this.repo.save(prediction);

}

}
async getCommunityPrediction(
  matchId: number,
) {

  const predictions = await this.repo.find({
    where: {
      match: {
        id: matchId,
      },
    },
  });
console.log("Match", matchId);
console.log("Predictions", predictions.length);
console.log(predictions);
  const total = predictions.length;

  if (total === 0) {

    return {

      home: 0,
      draw: 0,
      away: 0,

      homeOdds: 0,
      drawOdds: 0,
      awayOdds: 0,

    };

  }

  const home =
    predictions.filter(
      p => p.choice === PredictionChoice.HOME,
    ).length;

  const draw =
    predictions.filter(
      p => p.choice === PredictionChoice.DRAW,
    ).length;

  const away =
    predictions.filter(
      p => p.choice === PredictionChoice.AWAY,
    ).length;

  const homePercent =
    Math.round(home / total * 100);

  const drawPercent =
    Math.round(draw / total * 100);

  const awayPercent =
    100 -
    homePercent -
    drawPercent;

  return {

  homeChance: homePercent,
  drawChance: drawPercent,
  awayChance: awayPercent,

  homeOdds: Number((100 / homePercent).toFixed(2)),
  drawOdds: Number((100 / drawPercent).toFixed(2)),
  awayOdds: Number((100 / awayPercent).toFixed(2)),

};

}
}