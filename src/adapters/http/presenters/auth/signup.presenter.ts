import { InternalServerError, UnauthorizedError } from "@/domain/errors";
import { SignupPresenterPort } from "@/ports/http/presenters/auth";
import { SignupUseCasePort } from "@/ports/usecases/auth";
import { HttpStatusCode } from "@/types/http";

export class SignupPresenterAdapter implements SignupPresenterPort {
  constructor(private readonly signupUseCase: SignupUseCasePort) {}

  async execute({
    email,
    password,
    passwordConfirmation,
  }: SignupPresenterPort.Param): Promise<SignupPresenterPort.Response> {
    const response = await this.signupUseCase.execute({
      email,
      password,
      passwordConfirmation,
    });

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
