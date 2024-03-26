import { BcryptCompareCryptographyAdapter } from "@/adapters/cryptography/bcrypt";

export class BcryptCompareCryptographyFactory {
  static create() {
    return new BcryptCompareCryptographyAdapter();
  }
}
