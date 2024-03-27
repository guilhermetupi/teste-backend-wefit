import { GenerateTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";

export function makeSut() {
  const sut = new GenerateTokenJwtAdapter();

  return {
    sut,
  };
}
