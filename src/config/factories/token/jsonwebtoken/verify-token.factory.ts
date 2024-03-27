import { VerifyTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";
import { VerifyTokenPort } from "@/ports/token";

class VerifyTokenJwtFactory {
  static create(): VerifyTokenPort {
    console.group();
    console.log("VerifyTokenJwtFactory.create()");
    console.groupEnd();
    return new VerifyTokenJwtAdapter();
  }
}

export const verifyTokenJwt = VerifyTokenJwtFactory.create();
