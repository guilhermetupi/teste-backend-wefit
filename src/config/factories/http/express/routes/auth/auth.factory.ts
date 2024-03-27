import Express from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { AuthExpressRouteAdapter } from "@/adapters/http/express/routes/auth";
import { signinPresenter, signupPresenter } from "../../../presenters/auth";

class AuthExpressRouteAdapterFactory {
  static create(): HttpRouteAdapterPort<Express.Router> {
    return new AuthExpressRouteAdapter(signinPresenter, signupPresenter);
  }
}

export const authExpressRouteAdapter = AuthExpressRouteAdapterFactory.create();
