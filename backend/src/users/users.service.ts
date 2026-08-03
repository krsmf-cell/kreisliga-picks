import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User, UserRole } from "./entities/user.entity";
import { UpdateAdminUserDto } from "./dto/update-admin-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({
      order: {
        username: "ASC",
      },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        "Benutzer nicht gefunden",
      );
    }

    return user;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async create(dto: CreateUserDto) {
    const user =
      this.usersRepository.create({

        username: dto.username,

        email: dto.email,

        passwordHash: dto.passwordHash,

        role: dto.role ?? UserRole.USER,

        active: dto.active ?? true,

        predictionLeague:
          dto.predictionLeague ?? false,

      });

    return this.usersRepository.save(user);
  }

  async update(
    id: number,
    dto: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (dto.username !== undefined) {
      user.username = dto.username;
    }

    if (dto.email !== undefined) {
      user.email = dto.email;
    }

    if (dto.passwordHash !== undefined) {
    user.passwordHash = dto.passwordHash;
}

    if (dto.role !== undefined) {
      user.role = dto.role;
    }

    if (dto.active !== undefined) {
      user.active = dto.active;
    }

    if (
      dto.predictionLeague !== undefined
    ) {
      user.predictionLeague =
        dto.predictionLeague;
    }

    return this.usersRepository.save(user);
  }

  save(user: User) {
    return this.usersRepository.save(user);
  }

  async makeAdmin(
    username: string,
  ) {
    const user =
      await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException(
        "Benutzer nicht gefunden",
      );
    }

    user.role = UserRole.ADMIN;

    return this.usersRepository.save(user);
  }
async updateAdmin(
  id: number,
  dto: UpdateAdminUserDto,
) {

  const user = await this.findOne(id);

  if (dto.username !== undefined)
    user.username = dto.username;

  if (dto.email !== undefined)
    user.email = dto.email;

  if (dto.role !== undefined)
    user.role = dto.role;

  if (dto.active !== undefined)
    user.active = dto.active;

  if (dto.predictionLeague !== undefined)
    user.predictionLeague =
      dto.predictionLeague;

  return this.usersRepository.save(user);

}
  async remove(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);

    return {
      success: true,
    };
  }
}