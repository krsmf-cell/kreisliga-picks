import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Season } from "./entities/season.entity";
import { League } from "../leagues/entities/league.entity";

import { CreateSeasonDto } from "./dto/create-season.dto";
import { UpdateSeasonDto } from "./dto/update-season.dto";

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private readonly repo: Repository<Season>,

    @InjectRepository(League)
    private readonly leagueRepo: Repository<League>,
  ) {}

  findAll() {
    return this.repo.find({
      order: {
        startDate: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const season = await this.repo.findOne({
      where: { id },
    });

    if (!season) {
      throw new NotFoundException("Saison nicht gefunden");
    }

    return season;
  }

  async create(dto: CreateSeasonDto) {

    const league = await this.leagueRepo.findOne({
      where: {
        id: dto.leagueId,
      },
    });

    if (!league) {
      throw new NotFoundException("Liga nicht gefunden");
    }

    const season = this.repo.create({
      name: dto.name,
      league,
      startDate: dto.startDate,
      endDate: dto.endDate,
      active: dto.active,
    });

    return this.repo.save(season);
  }

  async update(
    id: number,
    dto: UpdateSeasonDto,
  ) {
    const season = await this.findOne(id);

    if (dto.leagueId) {

      const league = await this.leagueRepo.findOne({
        where: {
          id: dto.leagueId,
        },
      });

      if (!league) {
        throw new NotFoundException("Liga nicht gefunden");
      }

      season.league = league;
    }

    if (dto.name !== undefined) {
      season.name = dto.name;
    }

    if (dto.startDate !== undefined) {
      season.startDate = new Date(dto.startDate);
    }

    if (dto.endDate !== undefined) {
      season.endDate = new Date(dto.endDate);
    }

    if (dto.active !== undefined) {
      season.active = dto.active;
    }

    return this.repo.save(season);
  }

  async remove(id: number) {
    const season = await this.findOne(id);

    await this.repo.remove(season);

    return {
      success: true,
    };
  }
}