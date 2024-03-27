import { TypeOrmDatabaseAdapter } from "@/adapters/database/orm";
import { AppDataSource } from "@/config/orm";
import { DatabaseAdapterPort } from "@/ports/database";

class TypeOrmDatabaseAdapterFactory {
  static create(): DatabaseAdapterPort {
    return new TypeOrmDatabaseAdapter(AppDataSource);
  }
}

export const typeOrmDatabaseAdapter = TypeOrmDatabaseAdapterFactory.create();
