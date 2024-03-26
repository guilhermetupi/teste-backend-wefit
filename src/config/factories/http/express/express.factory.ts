import { ExpressHttpServerAdapter } from "@/adapters/http/express";
import { HttpServerAdapterPort } from "@/ports/http";
import { TypeOrmDatabaseAdapterFactory } from "../../database/orm";
import { AuthExpressRouteAdapterFactory } from "./routes/auth/auth.factory";

export class ExpressHttpServerAdapterFactory {
  static create(): HttpServerAdapterPort {
    const routeAdapters = [AuthExpressRouteAdapterFactory.create()];
    const databaseAdapter = TypeOrmDatabaseAdapterFactory.create();

    return new ExpressHttpServerAdapter(routeAdapters, databaseAdapter);
  }
}
