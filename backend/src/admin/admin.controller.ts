import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";

@Controller("admin")
export class AdminController {

  @Get()
  @UseGuards(
    JwtAuthGuard,
    AdminGuard,
  )
  dashboard() {

    return {
      success: true,
      message: "Willkommen im Adminbereich",
    };

  }

}