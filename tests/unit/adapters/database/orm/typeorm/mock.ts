import { TypeOrmDatabaseAdapter } from "@/adapters/database/orm/typeorm.adapter";

class DataSourceStub {
  async initialize() {
    return Promise.resolve();
  }
}

export function makeSut() {
  const dataSourceStub = new DataSourceStub();
  const sut = new TypeOrmDatabaseAdapter(dataSourceStub as any);

  return { sut, dataSourceStub };
}
