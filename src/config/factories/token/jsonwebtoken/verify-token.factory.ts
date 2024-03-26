import { VerifyTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";
import { VerifyTokenPort } from "@/ports/token";

export class VerifyTokenJwtFactory {
  static create(): VerifyTokenPort {
    return new VerifyTokenJwtAdapter();
  }
}
