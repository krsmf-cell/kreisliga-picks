import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match, MatchStatus } from "../matches/entities/match.entity";
import { Matchday } from "./entities/matchday.entity";
import { Season } from "../seasons/entities/season.entity";

import { CreateMatchdayDto } from "./dto/create-matchday.dto";
import { UpdateMatchdayDto } from "./dto/update-matchday.dto";

@Injectable()
export class MatchdaysService {
  constructor(
  @InjectRepository(Matchday)
  private readonly repo: Repository<Matchday>,

  @InjectRepository(Season)
  private readonly seasonRepo: Repository<Season>,

  @InjectRepository(Match)
  private readonly matchRepo: Repository<Match>,
) {}

  findAll() {
    return this.repo.find({
      order: {
        number: "ASC",
      },
    });
  }

  async findOne(id: number) {
    const matchday = await this.repo.findOne({
      where: { id },
    });

    if (!matchday) {
      throw new NotFoundException("Spieltag nicht gefunden");
    }

    return matchday;
  }

  async create(dto: CreateMatchdayDto) {
    const season = await this.seasonRepo.findOne({
      where: {
        id: dto.seasonId,
      },
    });

    if (!season) {
      throw new NotFoundException("Saison nicht gefunden");
    }

    const matchday = this.repo.create({
      number: dto.number,
      season,
      deadline: dto.deadline,
      active: dto.active,
    });

    return this.repo.save(matchday);
  }

  async update(
    id: number,
    dto: UpdateMatchdayDto,
  ) {
    const matchday = await this.findOne(id);

    if (dto.seasonId) {
      const season = await this.seasonRepo.findOne({
        where: { id: dto.seasonId },
      });

      if (!season) {
        throw new NotFoundException("Saison nicht gefunden");
      }

      matchday.season = season;
    }

    if (dto.number !== undefined)
      matchday.number = dto.number;

    if (dto.deadline !== undefined)
      matchday.deadline = new Date(dto.deadline);

    if (dto.active !== undefined)
      matchday.active = dto.active;

    return this.repo.save(matchday);
  }

  async remove(id: number) {
    const matchday = await this.findOne(id);

    await this.repo.remove(matchday);

    return {
      success: true,
    };
  }

  async getCurrent() {

  const season = await this.seasonRepo.findOne({
    where: {
      active: true,
    },
  });

  if (!season) {
    return null;
  }

  // Alle Spieltage der aktiven Saison
  const matchdays = await this.repo.find({
  where: {
    season: {
      id: season.id,
    },
  },
  relations: {
    matches: true,
  },
  order: {
    number: "ASC",
  },
});

  // Erster Spieltag mit mindestens einem nicht beendeten Spiel
  for (const matchday of matchdays) {

  const hasOpenMatch = matchday.matches.some(
    (match) => match.status !== MatchStatus.FINISHED,
  );

  if (hasOpenMatch) {
    return matchday;
  }

}

  // Alle Spieltage beendet
  return null;
}
}