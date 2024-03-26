import Express from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { AuthExpressRouteAdapter } from "@/adapters/http/express/routes/auth";
import {
  SigninPresenterFactory,
  SignupPresenterFactory,
} from "../../../presenters/auth";

export class AuthExpressRouteAdapterFactory {
  static create(): HttpRouteAdapterPort<Express.Router> {
    const signinPresenterAdapter = SigninPresenterFactory.create();
    const signupPresenterAdapter = SignupPresenterFactory.create();

    return new AuthExpressRouteAdapter(
      signinPresenterAdapter,
      signupPresenterAdapter
    );
  }
}
