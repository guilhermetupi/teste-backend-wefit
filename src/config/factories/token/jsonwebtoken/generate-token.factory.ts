import { GenerateTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";
import { GenerateTokenPort } from "@/ports/token";

class GenerateTokenJwtFactory {
  static create(): GenerateTokenPort {
    return new GenerateTokenJwtAdapter();
  }
}

export const generateTokenJwt = GenerateTokenJwtFactory.create();
