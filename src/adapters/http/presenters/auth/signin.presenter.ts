import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { SigninPresenterPort } from "@/ports/http/presenters/auth";
import { SigninUseCasePort } from "@/ports/usecases/auth";
import { AuthResponse } from "@/types/auth";
import { ErrorType } from "@/types/error";
import { HttpStatusCode } from "@/types/http";

export class SigninPresenterAdapter implements SigninPresenterPort {
  constructor(private readonly signinUseCase: SigninUseCasePort) {}

  async execute({
    email,
    password,
  }: SigninPresenterPort.Param): Promise<SigninPresenterPort.Response> {
    const response = await this.signinUseCase.execute({ email, password });

    const responseHasError = response instanceof Error;

    if (responseHasError && response.name === ErrorType.INTERNAL_SERVER) {
      return {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: response.message,
      };
    }

    if (responseHasError && response.name === ErrorType.UNAUTHORIZED) {
      return {
        status: HttpStatusCode.UNAUTHORIZED,
        message: response.message,
      };
    }

    return {
      status: HttpStatusCode.OK,
      data: response as AuthResponse,
    };
  }
}
