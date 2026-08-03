import {
  Controller,
  Get,
  Post,
} from "@nestjs/common";

import { PredictionLeagueService } from "./prediction-league.service";
import { PredictionLeagueTableService } from "./services/prediction-league-table.service";

@Controller("prediction-league")
export class PredictionLeagueController {

  constructor(
    private readonly predictionLeagueService: PredictionLeagueService,
    private readonly tableService: PredictionLeagueTableService,
  ) {}

  /**
   * Spielplan erzeugen
   */
  @Post("generate")
  generateSchedule() {
    return this.predictionLeagueService.generateSchedule();
  }

  /**
   * Alle Begegnungen
   */
  @Get("fixtures")
  getFixtures() {
    return this.predictionLeagueService.getFixtures();
  }

  /**
   * Tabelle neu berechnen
   */
  @Post("table/rebuild")
  async rebuildTable() {

    await this.tableService.rebuild();

    return {
      success: true,
    };

  }

  /**
   * Aktuelle Tabelle
   */
 @Get("table")
getTable() {
  return this.predictionLeagueService.getTable();
  }

}