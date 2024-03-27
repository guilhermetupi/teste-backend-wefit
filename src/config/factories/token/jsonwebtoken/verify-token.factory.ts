import { VerifyTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";
import { VerifyTokenPort } from "@/ports/token";

class VerifyTokenJwtFactory {
  static create(): VerifyTokenPort {
    return new VerifyTokenJwtAdapter();
  }
}

export const verifyTokenJwt = VerifyTokenJwtFactory.create();
