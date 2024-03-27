import { ExpressHttpServerAdapter } from "@/adapters/http/express";
import { HttpServerAdapterPort } from "@/ports/http";
import { typeOrmDatabaseAdapter } from "../../database/orm";
import { authExpressRouteAdapter } from "./routes/auth";
import { vendorOrBuyerExpressRouteAdapter } from "./routes/vendor-or-buyer";

class ExpressHttpServerAdapterFactory {
  static create(): HttpServerAdapterPort {
    const routeAdapters = [
      authExpressRouteAdapter,
      vendorOrBuyerExpressRouteAdapter,
    ];

    return new ExpressHttpServerAdapter(routeAdapters, typeOrmDatabaseAdapter);
  }
}

export const expressHttpServerAdapter =
  ExpressHttpServerAdapterFactory.create();
