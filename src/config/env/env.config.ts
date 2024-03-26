import { DatabaseEnv } from "@/types/database";
import { NODE_ENV } from "@/types/environment";
import { TokenData } from "@/types/token";

export class Environment {
  public static get httpServerPort(): number {
    return Number(process.env.HTTP_PORT) || 4568;
  }

  public static get databaseConfig(): DatabaseEnv {
    return {
      host: process.env.MYSQLDB_HOST || "localhost",
      port: Number(process.env.MYSQLDB_PORT) || 3306,
      database: process.env.MYSQLDB_DATABASE || "wefit",
      username: process.env.MYSQLDB_USER || "wefit",
      password: process.env.MYSQLDB_PASSWORD || "senha_root_123",
    };
  }

  public static get nodeEnv(): NODE_ENV {
    const nodeEnv = process.env.NODE_ENV as NODE_ENV | undefined;
    return nodeEnv || NODE_ENV.DEV;
  }

  public static get tokenData(): TokenData {
    return {
      secret: process.env.TOKEN_SECRET || "secret",
      accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
      refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "1d",
    };
  }

  public static get saltRounds(): number {
    return Number(process.env.SALT_ROUNDS) || 10;
  }
}
