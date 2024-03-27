import { SignupPresenterAdapter } from "@/adapters/http/presenters/auth";
import { SignupUseCasePort } from "@/ports/usecases/auth";

class SignupUseCaseStub implements SignupUseCasePort {
  async execute(): Promise<SignupUseCasePort.Response> {
    return {
      accessToken: "any_token",
    };
  }
}

export function makeSut() {
  const signupUseCaseStub = new SignupUseCaseStub();
  const sut = new SignupPresenterAdapter(signupUseCaseStub);

  return {
    sut,
    signupUseCaseStub,
  };
}
