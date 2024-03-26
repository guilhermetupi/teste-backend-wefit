import { GenerateTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";
import { GenerateTokenPort } from "@/ports/token";

export class GenerateTokenJwtFactory {
  static create(): GenerateTokenPort {
    return new GenerateTokenJwtAdapter();
  }
}
