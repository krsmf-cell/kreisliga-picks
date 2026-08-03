import {
  Controller,
  Get,
  Post,
} from "@nestjs/common";

import { StatisticsService } from "./statistics.service";

@Controller("statistics")
export class StatisticsController {

  constructor(
    private readonly statisticsService: StatisticsService,
  ) {}

  @Post("rebuild")
  rebuild() {
    return this.statisticsService.rebuild();
  }

  @Get("standings")
  getStandings() {
    return this.statisticsService.getStandings();
  }

}