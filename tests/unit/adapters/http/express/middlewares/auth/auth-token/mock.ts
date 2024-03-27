import { AuthTokenExpressMiddlewareAdapter } from "@/adapters/http/express/middlewares/auth";
import { VerifyTokenPort } from "@/ports/token";

class VerifyTokenAdapterStub implements VerifyTokenPort {
  execute(token: string): any {
    return { id: "valid_id" };
  }
}

export function makeSut() {
  const verifyTokenAdapterStub = new VerifyTokenAdapterStub();
  const sut = new AuthTokenExpressMiddlewareAdapter(verifyTokenAdapterStub);

  return { sut, verifyTokenAdapterStub };
}
