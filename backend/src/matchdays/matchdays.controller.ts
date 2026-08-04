import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from "@nestjs/common";

import { MatchdaysService } from "./matchdays.service";

import { CreateMatchdayDto } from "./dto/create-matchday.dto";
import { UpdateMatchdayDto } from "./dto/update-matchday.dto";

@Controller("matchdays")
export class MatchdaysController {
  constructor(
    private readonly matchdaysService: MatchdaysService,
  ) {}

  @Get()
  findAll() {
     console.log("MATCHDAYS CONTROLLER");
    return this.matchdaysService.findAll();
  }

  @Get("current")
  getCurrent() {
    return this.matchdaysService.getCurrent();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.matchdaysService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateMatchdayDto) {
    return this.matchdaysService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateMatchdayDto,
  ) {
    return this.matchdaysService.update(
      Number(id),
      dto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.matchdaysService.remove(
      Number(id),
    );
  }
}