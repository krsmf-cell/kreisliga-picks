import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PredictionsService } from "../predictions/predictions.service";
import { MatchStatus } from "./entities/match.entity";
import { Match } from "./entities/match.entity";
import { Matchday } from "../matchdays/entities/matchday.entity";
import { Team } from "../teams/entities/team.entity";
import { PredictionEngineService } from "../prediction-engine/prediction-engine.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { PredictionLeagueService } from "../prediction-league/prediction-league.service";

@Injectable()
export class MatchesService {
 constructor(
  @InjectRepository(Match)
  private readonly repo: Repository<Match>,

  @InjectRepository(Matchday)
  private readonly matchdayRepo: Repository<Matchday>,

  @InjectRepository(Team)
  private readonly teamRepo: Repository<Team>,

private readonly predictionLeagueService: PredictionLeagueService,

  private readonly predictionsService: PredictionsService,

  private readonly predictionEngine: PredictionEngineService,
) {}

  findAll() {
    return this.repo.find({
      order: {
        kickoff: "ASC",
      },
    });
  }

  async findOne(id: number) {
    const match = await this.repo.findOne({
      where: { id },
    });

    if (!match) {
      throw new NotFoundException("Spiel nicht gefunden");
    }

    return match;
  }

  async findByMatchday(matchdayId: number) {
    return this.repo.find({
      where: {
        matchday: {
          id: matchdayId,
        },
      },
      order: {
        kickoff: "ASC",
      },
    });
  }

  async create(dto: CreateMatchDto) {
    console.log("SERVICE DTO:", dto);
     console.log(dto);
    console.log("===================");
    const matchday = await this.matchdayRepo.findOne({
      where: {
        id: dto.matchdayId,
      },
    });

    if (!matchday) {
      throw new NotFoundException("Spieltag nicht gefunden");
    }

    const homeTeam = await this.teamRepo.findOne({
      where: {
        id: dto.homeTeamId,
      },
    });

    if (!homeTeam) {
      throw new NotFoundException("Heimteam nicht gefunden");
    }

    const awayTeam = await this.teamRepo.findOne({
      where: {
        id: dto.awayTeamId,
      },
    });

    if (!awayTeam) {
      throw new NotFoundException("Gastteam nicht gefunden");
    }

    const match = this.repo.create({

  matchday,

  homeTeam,

  awayTeam,

  kickoff: dto.kickoff,

  homeGoals: dto.homeGoals,

  awayGoals: dto.awayGoals,

  status: dto.status as MatchStatus,

  location: dto.location,

  homeOdds: dto.homeOdds,
  drawOdds: dto.drawOdds,
  awayOdds: dto.awayOdds,

});

    const saved = await this.repo.save(match);

if (saved.status === MatchStatus.FINISHED) {

  await this.predictionEngine.updateRatings(saved);

  await this.predictionsService.calculateMatch(saved.id);

}

return saved;
  }

  async update(
    id: number,
    dto: UpdateMatchDto,
  ) {
    const match = await this.findOne(id);

    if (dto.matchdayId !== undefined) {
      const matchday = await this.matchdayRepo.findOne({
        where: {
          id: dto.matchdayId,
        },
      });

      if (!matchday) {
        throw new NotFoundException("Spieltag nicht gefunden");
      }

      match.matchday = matchday;
    }

    if (dto.homeTeamId !== undefined) {
      const homeTeam = await this.teamRepo.findOne({
        where: {
          id: dto.homeTeamId,
        },
      });

      if (!homeTeam) {
        throw new NotFoundException("Heimteam nicht gefunden");
      }

      match.homeTeam = homeTeam;
    }

    if (dto.awayTeamId !== undefined) {
      const awayTeam = await this.teamRepo.findOne({
        where: {
          id: dto.awayTeamId,
        },
      });

      if (!awayTeam) {
        throw new NotFoundException("Gastteam nicht gefunden");
      }

      match.awayTeam = awayTeam;
    }

    if (dto.kickoff !== undefined) {
      match.kickoff = new Date(dto.kickoff);
    }

    if (dto.homeGoals !== undefined) {
      match.homeGoals = dto.homeGoals;
    }

    if (dto.awayGoals !== undefined) {
      match.awayGoals = dto.awayGoals;
    }

    if (dto.status !== undefined) {
      match.status = dto.status as any;
    }

    if (dto.location !== undefined) {
      match.location = dto.location;
    }
    if (dto.homeOdds !== undefined) {
  match.homeOdds = dto.homeOdds;
}

if (dto.drawOdds !== undefined) {
  match.drawOdds = dto.drawOdds;
}

if (dto.awayOdds !== undefined) {
  match.awayOdds = dto.awayOdds;
}

    const saved = await this.repo.save(match);

if (saved.status === MatchStatus.FINISHED) {

 await this.predictionEngine.updateTeamStats(saved);

await this.predictionEngine.updateRatings(saved);

await this.predictionsService.calculateMatch(saved.id);

await this.predictionLeagueService.calculateMatchday(
  saved.matchday.id,
);
}
return saved;
  }

async updateResult(

  id: number,

  dto: UpdateResultDto,

) {

  const match =
    await this.findOne(id);

  match.homeGoals =
    dto.homeGoals;

  match.awayGoals =
    dto.awayGoals;

  match.status =
    MatchStatus.FINISHED;

  const saved =
    await this.repo.save(match);

  await this.predictionEngine.updateTeamStats(
    saved,
  );

  await this.predictionEngine.updateRatings(
    saved,
  );

  await this.predictionsService.calculateMatch(
    saved.id,
  );

  return saved;

}


  async remove(id: number) {
    const match = await this.findOne(id);

    await this.repo.remove(match);

    return {
      success: true,
    };
  }
}