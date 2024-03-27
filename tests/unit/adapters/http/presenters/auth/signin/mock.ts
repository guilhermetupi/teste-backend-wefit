import { SigninPresenterAdapter } from "@/adapters/http/presenters/auth";
import { SigninUseCasePort } from "@/ports/usecases/auth";

class SigninUseCaseStub implements SigninUseCasePort {
  async execute(): Promise<SigninUseCasePort.Response> {
    return {
      accessToken: "any_token",
    };
  }
}

export function makeSut() {
  const signinUseCaseStub = new SigninUseCaseStub();
  const sut = new SigninPresenterAdapter(signinUseCaseStub);

  return {
    sut,
    signinUseCaseStub,
  };
}
