import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";

import { ImportsService } from "./imports.service";
import { ImportScheduleDto } from "./dto/import-schedule.dto";

@Controller("imports")
export class ImportsController {

  constructor(

    private readonly importsService: ImportsService,

  ) {}

  @Post("schedule")

  importSchedule(

    @Body()
    dto: ImportScheduleDto,

  ) {

    return this.importsService.importSchedule(
      dto,
    );

  }

}