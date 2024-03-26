import { AuthTokenExpressMiddlewareAdapter } from "@/adapters/http/express/middlewares/auth";
import { TokenValidationUseCaseFactory } from "@/config/factories/usecases/auth";
import { MiddlewareHttpPort } from "@/ports/http";

export class AuthTokenExpressMiddlewareAdapterFactory {
  static create(): MiddlewareHttpPort {
    const tokenValidationUseCase = TokenValidationUseCaseFactory.create();

    return new AuthTokenExpressMiddlewareAdapter(tokenValidationUseCase);
  }
}
