import Express from "express";
import { ExpressHttpAdapter } from "@/adapters/http/express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { DatabaseAdapterPort } from "@/ports/database";

class RouteStub implements HttpRouteAdapterPort<Express.Router> {
  name = "route";

  setup(router: Express.Router): void {}
}

class DatabaseStub implements DatabaseAdapterPort {
  connect(): Promise<void> {
    return Promise.resolve();
  }
}

export function makeSut() {
  const routeStub = new RouteStub();
  const databaseStub = new DatabaseStub();
  const sut = new ExpressHttpAdapter([routeStub], databaseStub);

  return {
    sut,
    routeStub,
    databaseStub,
  };
}
