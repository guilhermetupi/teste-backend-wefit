import { AuthExpressRouteAdapter } from "@/adapters/http/express/routes/auth";
import {
  SigninPresenterPort,
  SignupPresenterPort,
} from "@/ports/http/presenters/auth";

class SigninPresenterAdapterStub implements SigninPresenterPort {
  async execute(
    param: SigninPresenterPort.Param
  ): Promise<SigninPresenterPort.Response> {
    return {
      status: 200,
      data: { accessToken: "any_token" },
    };
  }
}

class SignupPresenterAdapterStub implements SignupPresenterPort {
  async execute(
    param: SignupPresenterPort.Param
  ): Promise<SignupPresenterPort.Response> {
    return {
      status: 200,
      data: { accessToken: "any_token" },
    };
  }
}

export function makeSut() {
  const signinPresenterAdapterStub = new SigninPresenterAdapterStub();
  const signupPresenterAdapterStub = new SignupPresenterAdapterStub();
  const sut = new AuthExpressRouteAdapter(
    signinPresenterAdapterStub,
    signupPresenterAdapterStub
  );

  return { sut, signinPresenterAdapterStub, signupPresenterAdapterStub };
}
