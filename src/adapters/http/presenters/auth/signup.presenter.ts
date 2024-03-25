import { SignupPresenterPort } from "@/ports/http/presenters/auth";
import { SignupUseCasePort } from "@/ports/usecases/auth";
import { HttpStatusCode } from "@/types/http";
import { CreateUserCommand } from "@/domain/commands";
import { Email, Password } from "@/domain/value-objects";
import {
  ConflictError,
  InternalServerError,
  InvalidParamError,
  UnauthorizedError,
} from "@/domain/errors";

export class SignupPresenterAdapter implements SignupPresenterPort {
  constructor(private readonly signupUseCase: SignupUseCasePort) {}

  async execute(
    data: SignupPresenterPort.Param
  ): Promise<SignupPresenterPort.Response> {
    try {
      const { email, password } = this.createObjectValues(data);

      const response = await this.signupUseCase.execute({
        email,
        password,
        passwordConfirmation: data.passwordConfirmation,
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

      if (response instanceof ConflictError) {
        return {
          status: HttpStatusCode.CONFLICT,
          message: response.message,
        };
      }

      if (response instanceof InvalidParamError) {
        return {
          status: HttpStatusCode.BAD_REQUEST,
          message: response.message,
        };
      }

      return {
        status: HttpStatusCode.CREATED,
        data: response,
      };
    } catch (error) {
      return {
        status: HttpStatusCode.BAD_REQUEST,
        message: (error as InvalidParamError).message,
      };
    }
  }

  private createObjectValues(
    data: SignupPresenterPort.Param
  ): Omit<CreateUserCommand, "passwordConfirmation"> {
    const email = Email.create(data.email);
    const password = Password.create(data.password);

    if (email instanceof InvalidParamError) {
      throw email;
    }

    if (password instanceof InvalidParamError) {
      throw password;
    }

    return { email, password };
  }
}
