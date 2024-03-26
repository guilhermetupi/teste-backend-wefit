import { TypeOrmDatabaseAdapter } from "@/adapters/database/orm";
import { AppDataSource } from "@/config/orm";
import { DatabaseAdapterPort } from "@/ports/database";

export class TypeOrmDatabaseAdapterFactory {
  static create(): DatabaseAdapterPort {
    return new TypeOrmDatabaseAdapter(AppDataSource);
  }
}