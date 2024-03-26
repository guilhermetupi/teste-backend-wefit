import { DatabaseAdapterPort } from "@/ports/database";
import { DataSource } from "typeorm";

export class TypeOrmDatabaseAdapter implements DatabaseAdapterPort {
  constructor(private readonly dataSource: DataSource) {}

  async connect(): Promise<void> {
    await this.dataSource.initialize();
  }
}
