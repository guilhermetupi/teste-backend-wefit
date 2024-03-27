import { BcryptCompareCryptographyAdapter } from "@/adapters/cryptography/bcrypt";

class BcryptCompareCryptographyFactory {
  static create() {
    return new BcryptCompareCryptographyAdapter();
  }
}

export const bcryptCompareCryptography =
  BcryptCompareCryptographyFactory.create();
