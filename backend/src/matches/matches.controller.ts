import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from "@nestjs/common";

import { MatchesService } from "./matches.service";
import { UpdateResultDto } from "./dto/update-result.dto";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";

@Controller("matches")
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
  ) {}

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

 @Get("matchday/:id")
findByMatchday(
  @Param("id") id: string,
) {
  return this.matchesService.findByMatchday(
    Number(id),
  );
}

@Post()
create(@Body() dto: CreateMatchDto) {
  console.log("CONTROLLER DTO:", dto);
  console.log(dto);
  console.log("======================");
  return this.matchesService.create(dto);
}
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateMatchDto,
  ) {
    return this.matchesService.update(
      Number(id),
      dto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.matchesService.remove(
      Number(id),
    );
  }
  @Patch(":id/result")
updateResult(

  @Param("id") id: string,

  @Body() dto: UpdateResultDto,

) {

  return this.matchesService.updateResult(

    Number(id),

    dto,

  );

}

}