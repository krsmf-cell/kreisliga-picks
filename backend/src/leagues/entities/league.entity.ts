import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { Team } from "../../teams/entities/team.entity";

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @Column({
    unique: true,
  })
  code!: string;

  @Column({
    default: true,
  })
  isPublic!: boolean;

  @OneToMany(
    () => Team,
    (team) => team.league,
  )
  teams!: Team[];

  @CreateDateColumn()
  createdAt!: Date;
}