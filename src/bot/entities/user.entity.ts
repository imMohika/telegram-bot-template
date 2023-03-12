import { EntitySchema } from "typeorm";
import { config } from "~/config";

export const userRoles = ["user", "admin", "owner"] as const;
export type UserRole = (typeof userRoles)[number];

export interface UserEntity {
  id: number;
  telegramId: string;
  name?: string;
  username?: string;
  languageCode: string;
  role: UserRole;
  updatedAt: Date;
  createdAt: Date;
}

export const userEntity = new EntitySchema<UserEntity>({
  name: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: "increment",
    },
    telegramId: {
      name: "telegram_id",
      type: "varchar",
      length: 255,
      unique: true,
    },
    name: {
      name: "name",
      type: "varchar",
      length: 255,
      nullable: true,
    },
    username: {
      name: "username",
      type: "varchar",
      length: 255,
      nullable: true,
    },
    languageCode: {
      name: "language_code",
      type: "varchar",
      length: 4,
      default: config.DEFAULT_LOCALE,
    },
    role: {
      name: "role",
      type: "enum",
      enum: userRoles,
      default: "user",
    },
    updatedAt: {
      name: "updated_at",
      type: "datetime",
      updateDate: true,
    },
    createdAt: {
      name: "created_at",
      type: "datetime",
      createDate: true,
    },
  },
});
