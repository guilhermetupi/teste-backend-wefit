import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { SigninPresenterPort } from "@/ports/http/presenters/auth";
import { SigninUseCasePort } from "@/ports/usecases/auth";
import { HttpStatusCode } from "@/types/http";

export class SigninPresenterAdapter implements SigninPresenterPort {
  constructor(private readonly signinUseCase: SigninUseCasePort) {}

  async execute({
    email,
    password,
  }: SigninPresenterPort.Param): Promise<SigninPresenterPort.Response> {
    const response = await this.signinUseCase.execute({ email, password });

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
      status: HttpStatusCode.CREATED,
      data: response,
    };
  }
}
