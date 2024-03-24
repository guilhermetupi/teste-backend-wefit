import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Environment } from "../env";
import { NODE_ENV } from "@/types/environment";

function getDataSource() {
  const appDataSouceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "balance",
    entities: [__dirname + "/../adapters/orm/models/**/*.model{.ts,.js}"],
    migrations: [__dirname + "/../adapters/orm/migrations/**/*{.ts,.js}"],
    namingStrategy: new SnakeNamingStrategy(),
    useUTC: true,
  };

  const integrationTestDataSouceOptions: DataSourceOptions = {
    type: "better-sqlite3",
    database: ":memory:",
    dropSchema: true,
    synchronize: true,
    migrationsRun: true,
    entities: [__dirname + "/../adapters/orm/models/**/*.model{.ts,.js}"],
    migrations: [__dirname + "/../adapters/orm/migrations/**/*{.ts,.js}"],
    namingStrategy: new SnakeNamingStrategy(),
  };

  return Environment.nodeEnv === NODE_ENV.TEST
    ? integrationTestDataSouceOptions
    : appDataSouceOptions;
}

export const AppDataSource = new DataSource(getDataSource());
