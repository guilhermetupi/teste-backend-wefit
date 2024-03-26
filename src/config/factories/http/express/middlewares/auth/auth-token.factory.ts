import { AuthTokenExpressMiddlewareAdapter } from "@/adapters/http/express/middlewares/auth";
import { VerifyTokenJwtFactory } from "@/config/factories/token/jsonwebtoken";
import { MiddlewareHttpPort } from "@/ports/http";

export class AuthTokenExpressMiddlewareAdapterFactory {
  static create(): MiddlewareHttpPort {
    const verifyTokenJwt = VerifyTokenJwtFactory.create();

    return new AuthTokenExpressMiddlewareAdapter(verifyTokenJwt);
  }
}
