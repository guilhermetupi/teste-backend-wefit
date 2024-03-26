import { ExpressHttpServerAdapter } from "@/adapters/http/express";
import { HttpServerAdapterPort } from "@/ports/http";
import { TypeOrmDatabaseAdapterFactory } from "../../database/orm";
import { AuthExpressRouteAdapterFactory } from "./routes/auth";
import { VendorOrBuyerExpressRouteAdapterFactory } from "./routes/vendor-or-buyer";

export class ExpressHttpServerAdapterFactory {
  static create(): HttpServerAdapterPort {
    const routeAdapters = [
      AuthExpressRouteAdapterFactory.create(),
      VendorOrBuyerExpressRouteAdapterFactory.create(),
    ];
    const databaseAdapter = TypeOrmDatabaseAdapterFactory.create();

    return new ExpressHttpServerAdapter(routeAdapters, databaseAdapter);
  }
}
