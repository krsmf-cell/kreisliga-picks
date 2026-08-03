import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const emailExists = await this.usersService.findByEmail(dto.email);

    if (emailExists) {
      throw new BadRequestException('E-Mail bereits vergeben');
    }

    const usernameExists = await this.usersService.findByUsername(
      dto.username,
    );

    if (usernameExists) {
      throw new BadRequestException('Benutzername bereits vergeben');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    
  }
  async login(dto: LoginDto) {
  const user = await this.usersService.findByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedException(
      "Ungültige Zugangsdaten",
    );
  }

  if (!user.active) {
    throw new UnauthorizedException(
      "Benutzerkonto ist deaktiviert",
    );
  }

  const validPassword = await bcrypt.compare(
    dto.password,
    user.passwordHash,
  );

  if (!validPassword) {
    throw new UnauthorizedException(
      "Ungültige Zugangsdaten",
    );
  }

  const payload = {
    sub: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: await this.jwtService.signAsync(
      payload,
    ),

    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}
async makeAdmin(username: string) {
  return this.usersService.makeAdmin(username);
}
}