import { SignupPresenterAdapter } from "@/adapters/http/presenters/auth";
import { SignupUseCaseFactory } from "@/config/factories/usecases/auth";
import { SignupPresenterPort } from "@/ports/http/presenters/auth";

export class SignupPresenterFactory {
  static create(): SignupPresenterPort {
    const signupUseCase = SignupUseCaseFactory.create();

    return new SignupPresenterAdapter(signupUseCase);
  }
}
