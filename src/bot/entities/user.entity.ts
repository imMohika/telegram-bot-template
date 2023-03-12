import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { config } from "~/config";

export const UserRoles = ["user", "admin", "owner"] as const;
export type UserRole = (typeof UserRoles)[number];

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    name: "telegram_id",
    type: "varchar",
    length: 255,
    unique: true,
  })
  telegramId: string;

  @Column({
    name: "language_code",
    type: "varchar",
    length: 4,
    default: config.DEFAULT_LOCALE,
  })
  languageCode: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: "user",
  })
  role: UserRole;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  name?: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  username?: string;
}
