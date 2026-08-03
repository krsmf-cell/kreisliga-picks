import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from "@nestjs/common";

import { SeasonsService } from "./seasons.service";

import { CreateSeasonDto } from "./dto/create-season.dto";
import { UpdateSeasonDto } from "./dto/update-season.dto";

@Controller("seasons")
export class SeasonsController {
  constructor(
    private readonly seasonsService: SeasonsService,
  ) {}

  @Get()
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
  ) {
    return this.seasonsService.findOne(
      Number(id),
    );
  }

  @Post()
  create(
    @Body() dto: CreateSeasonDto,
  ) {
    return this.seasonsService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(
      Number(id),
      dto,
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
  ) {
    return this.seasonsService.remove(
      Number(id),
    );
  }
}