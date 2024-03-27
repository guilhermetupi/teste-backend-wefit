import { BcryptEncryptCryptographyAdapter } from "@/adapters/cryptography/bcrypt";

export function makeSut() {
  const sut = new BcryptEncryptCryptographyAdapter();

  return { sut };
}
