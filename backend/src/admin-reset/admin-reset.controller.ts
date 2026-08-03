import {
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminResetService } from "./admin-reset.service";

@Controller("admin/reset")
@UseGuards(JwtAuthGuard)
export class AdminResetController {

  constructor(
    private readonly service: AdminResetService,
  ) {}

  @Post("season")
  resetSeason() {

    return this.service.resetSeason();

  }

}