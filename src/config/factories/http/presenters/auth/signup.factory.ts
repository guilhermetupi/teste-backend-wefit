import { SignupPresenterAdapter } from "@/adapters/http/presenters/auth";
import { signupUseCase } from "@/config/factories/usecases/auth";
import { SignupPresenterPort } from "@/ports/http/presenters/auth";

class SignupPresenterFactory {
  static create(): SignupPresenterPort {
    console.group();
    console.log("SignupPresenterFactory.create()");
    console.groupEnd();
    return new SignupPresenterAdapter(signupUseCase);
  }
}

export const signupPresenter = SignupPresenterFactory.create();
