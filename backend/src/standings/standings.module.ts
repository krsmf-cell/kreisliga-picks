import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Match } from "../matches/entities/match.entity";

import { StandingsController } from "./standings.controller";
import { StandingsService } from "./standings.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
  ],
  controllers: [StandingsController],
  providers: [StandingsService],
})
export class StandingsModule {}