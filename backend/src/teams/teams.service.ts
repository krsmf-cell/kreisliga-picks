import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Team } from "./entities/team.entity";
import { League } from "../leagues/entities/league.entity";

import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly repo: Repository<Team>,

    @InjectRepository(League)
    private readonly leagueRepo: Repository<League>,
  ) {}

  async findAll() {
    return this.repo.find({
      relations: {
        league: true,
      },
      order: {
        name: "ASC",
      },
    });
  }

  async findOne(id: number) {
    const team = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        league: true,
      },
    });

    if (!team) {
      throw new NotFoundException("Team nicht gefunden");
    }

    return team;
  }

  async create(dto: CreateTeamDto) {
    console.log("DTO:", dto);

    const league = await this.leagueRepo.findOne({
      where: {
        id: dto.leagueId,
      },
    });

    if (!league) {
      throw new NotFoundException("Liga nicht gefunden");
    }

    const team = this.repo.create({
      name: dto.name,
      shortName: dto.shortName,
      logo: dto.logo,
      active: dto.active ?? true,
      league,
    });

    return this.repo.save(team);
  }

  async update(
    id: number,
    dto: UpdateTeamDto,
  ) {
    const team = await this.findOne(id);

    if (dto.leagueId !== undefined) {
      const league = await this.leagueRepo.findOne({
        where: {
          id: dto.leagueId,
        },
      });

      if (!league) {
        throw new NotFoundException("Liga nicht gefunden");
      }

      team.league = league;
    }

    if (dto.name !== undefined) team.name = dto.name;
    if (dto.shortName !== undefined) team.shortName = dto.shortName;
    if (dto.logo !== undefined) team.logo = dto.logo;
    if (dto.active !== undefined) team.active = dto.active;

    return this.repo.save(team);
  }

  async remove(id: number) {
    const team = await this.findOne(id);

    await this.repo.remove(team);

    return {
      success: true,
    };
  }
}