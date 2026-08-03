import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Team } from "./entities/team.entity";
import { League } from "../leagues/entities/league.entity";

import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      League,
    ]),
  ],
  controllers: [
    TeamsController,
  ],
  providers: [
    TeamsService,
  ],
  exports: [
    TeamsService,
  ],
})
export class TeamsModule {}