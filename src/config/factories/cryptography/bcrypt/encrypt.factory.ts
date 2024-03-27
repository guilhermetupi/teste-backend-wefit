import { BcryptEncryptCryptographyAdapter } from "@/adapters/cryptography/bcrypt";

class BcryptEncryptCryptographyFactory {
  static create() {
    return new BcryptEncryptCryptographyAdapter();
  }
}

export const bcryptEncryptCryptography =
  BcryptEncryptCryptographyFactory.create();
