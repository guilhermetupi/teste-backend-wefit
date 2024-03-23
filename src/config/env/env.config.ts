import { DatabaseEnv } from "@/domain/types/database";
import { NODE_ENV } from "@/domain/types/environment";

export class Environment {
  public static getHttpServerPort(): number {
    return Number(process.env.HTTP_PORT) || 4568;
  }

  public static getDatabaseConfig(): DatabaseEnv {
    return {
      host: process.env.MYSQLDB_HOST || "localhost",
      port: Number(process.env.MYSQLDB_PORT) || 3306,
      database: process.env.MYSQLDB_DATABASE || "wefit",
      username: process.env.MYSQLDB_USER || "wefit",
      password: process.env.MYSQLDB_PASSWORD || "senha_root_123",
    };
  }

  public static getNodeEnv(): NODE_ENV {
    const nodeEnv = process.env.NODE_ENV as NODE_ENV | undefined;
    return nodeEnv || NODE_ENV.DEV;
  }
}
