import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateAdminUserDto } from "./dto/update-admin-user.dto";
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
@Patch(":id/admin")
updateAdmin(
  @Param("id") id: string,
  @Body() dto: UpdateAdminUserDto,
) {
  return this.usersService.updateAdmin(
    Number(id),
    dto,
  );
}
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(
      Number(id),
      dto,
    );
  }
}