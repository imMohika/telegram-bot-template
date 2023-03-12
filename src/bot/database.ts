import { DataSource } from "typeorm";
import { userEntity } from "./entities/user.entity";
import { config } from "~/config";

export const dataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  entities: [userEntity],
  synchronize: config.isDev,
  logging: true,
});

export const initializeDatabase = async () => {
  if (dataSource.isInitialized) {
    return;
  }

  try {
    await dataSource.initialize();
  } catch (error) {
    console.error(error);
  }
};
