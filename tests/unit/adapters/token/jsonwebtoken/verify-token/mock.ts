import { VerifyTokenJwtAdapter } from "@/adapters/token/jsonwebtoken";

export function makeSut() {
  const sut = new VerifyTokenJwtAdapter();

  return {
    sut,
  };
}
