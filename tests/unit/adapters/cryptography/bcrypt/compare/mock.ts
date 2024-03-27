import { BcryptCompareCryptographyAdapter } from "@/adapters/cryptography/bcrypt";

export function makeSut() {
  const sut = new BcryptCompareCryptographyAdapter();

  return { sut };
}
