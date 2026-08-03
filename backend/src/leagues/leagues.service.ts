import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { League } from "./entities/league.entity";

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League)
    private readonly repo: Repository<League>,
  ) {}

  findAll() {
    return this.repo.find({
      order: {
        name: "ASC",
      },
    });
  }

  async findOne(id: number) {
    const league = await this.repo.findOne({
      where: { id },
    });

    if (!league) {
      throw new NotFoundException(
        "Liga nicht gefunden",
      );
    }

    return league;
  }

  create(data: Partial<League>) {
    return this.repo.save(
      this.repo.create(data),
    );
  }

  async update(
    id: number,
    data: Partial<League>,
  ) {
    const league = await this.findOne(id);

    Object.assign(league, data);

    return this.repo.save(league);
  }

  async remove(id: number) {
    const league = await this.findOne(id);

    await this.repo.remove(league);

    return {
      success: true,
    };
  }
}