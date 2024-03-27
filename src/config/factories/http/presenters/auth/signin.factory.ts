import { SigninPresenterAdapter } from "@/adapters/http/presenters/auth";
import { signinUseCase } from "@/config/factories/usecases/auth";
import { SigninPresenterPort } from "@/ports/http/presenters/auth";

class SigninPresenterFactory {
  static create(): SigninPresenterPort {
    console.group();
    console.log("SigninPresenterFactory.create()");
    console.groupEnd();
    return new SigninPresenterAdapter(signinUseCase);
  }
}

export const signinPresenter = SigninPresenterFactory.create();