import {
  Controller,
  Get,
  Param,
} from "@nestjs/common";

import { PredictionEngineService } from "./prediction-engine.service";

@Controller("prediction-engine")
export class PredictionEngineController {

  constructor(
    private readonly engine: PredictionEngineService,
  ) {}

  @Get(":id")
  predict(
    @Param("id") id: string,
  ) {
    return this.engine.predictMatch(
      Number(id),
    );
  }

}