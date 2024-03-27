import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Environment } from "../env";
import { NODE_ENV } from "@/types/environment";

function getDataSource() {
  const { database, host, password, port, username } =
    Environment.databaseConfig;
  const appDataSouceOptions: DataSourceOptions = {
    host,
    port,
    username,
    password,
    database,
    type: "mysql",
    entities: [
      __dirname + "/../../adapters/database/orm/models/**/*.model{.ts,.js}",
    ],
    migrations: [
      __dirname + "/../../adapters/database/orm/migrations/**/*{.ts,.js}",
    ],
    namingStrategy: new SnakeNamingStrategy(),
  };

  const testDataSouceOptions: DataSourceOptions = {
    type: "better-sqlite3",
    database: ":memory:",
    dropSchema: true,
    synchronize: true,
    migrationsRun: true,
    entities: [
      __dirname + "/../../adapters/database/orm/models/**/*.model{.ts,.js}",
    ],
    namingStrategy: new SnakeNamingStrategy(),
  };

  return Environment.nodeEnv === NODE_ENV.TEST
    ? testDataSouceOptions
    : appDataSouceOptions;
}

export const AppDataSource = new DataSource(getDataSource());
