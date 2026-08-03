import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

import { UserRole } from "../users/entities/user.entity";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException("Nicht angemeldet");
    }

    if (
      request.user.role !== UserRole.ADMIN &&
      request.user.role !== UserRole.MODERATOR
    ) {
      throw new ForbiddenException(
        "Keine Berechtigung",
      );
    }

    return true;
  }
}