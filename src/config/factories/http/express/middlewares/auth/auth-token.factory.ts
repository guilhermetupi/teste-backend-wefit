import { AuthTokenExpressMiddlewareAdapter } from "@/adapters/http/express/middlewares/auth";
import { verifyTokenJwt } from "@/config/factories/token/jsonwebtoken";
import { MiddlewareHttpPort } from "@/ports/http";

class AuthTokenExpressMiddlewareAdapterFactory {
  static create(): MiddlewareHttpPort {
    return new AuthTokenExpressMiddlewareAdapter(verifyTokenJwt);
  }
}

export const authTokenExpressMiddlewareAdapter =
  AuthTokenExpressMiddlewareAdapterFactory.create();
