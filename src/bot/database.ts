import { DataSource } from "typeorm";
import { config } from "~/config";
import { UserEntity } from "./entities/user.entity";

export const dataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  entities: [UserEntity],
  synchronize: config.isDev,
  logging: true,
});

export const initializeDatabase = async () => {
  if (dataSource.isInitialized) return;

  try {
    await dataSource.initialize();
  } catch (error) {
    console.error(error);
  }
};
