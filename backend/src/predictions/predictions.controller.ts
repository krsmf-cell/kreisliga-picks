import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PredictionsService } from "./predictions.service";

@Controller("predictions")
@UseGuards(JwtAuthGuard)
export class PredictionsController {

  constructor(
    private readonly predictionsService: PredictionsService,
  ) {}

  @Post("save")
  save(
    @Req() req: any,
    @Body() body: any[],
  ) {

    return this.predictionsService.savePredictions(
      req.user.id,
      body,
    );

  }

  @Get("matchday/:id")
  getByMatchday(
    @Req() req: any,
    @Param("id") id: string,
  ) {

    return this.predictionsService.getByMatchday(
      req.user.id,
      Number(id),
    );

  }
@Get("community/:id")
getCommunity(
  @Param("id") id: string,
) {

  return this.predictionsService.getCommunityPrediction(
    Number(id),
  );

}
}