import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { TokenValidationPresenterPort } from "@/ports/http/presenters/auth";
import { TokenValidationUseCasePort } from "@/ports/usecases/auth";
import { HttpStatusCode } from "@/types/http";

export class TokenValidationPresenterAdapter
  implements TokenValidationPresenterPort
{
  constructor(
    private readonly tokenValidationUseCase: TokenValidationUseCasePort
  ) {}

  execute(
    token: TokenValidationPresenterPort.Param
  ): TokenValidationPresenterPort.Response {
    const response = this.tokenValidationUseCase.execute(token);

    if (response instanceof InternalServerError) {
      return {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: response.message,
      };
    }

    if (response instanceof UnauthorizedError) {
      return {
        status: HttpStatusCode.UNAUTHORIZED,
        message: response.message,
      };
    }

    return {
      status: HttpStatusCode.NO_CONTENT,
    };
  }
}
