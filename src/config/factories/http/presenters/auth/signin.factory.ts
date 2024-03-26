import { SigninPresenterAdapter } from "@/adapters/http/presenters/auth";
import { SigninUseCaseFactory } from "@/config/factories/usecases/auth";
import { SigninPresenterPort } from "@/ports/http/presenters/auth";

export class SigninPresenterFactory {
  static create(): SigninPresenterPort {
    const signinUseCase = SigninUseCaseFactory.create();

    return new SigninPresenterAdapter(signinUseCase);
  }
}
