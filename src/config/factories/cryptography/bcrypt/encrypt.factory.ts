import { BcryptEncryptCryptographyAdapter } from "@/adapters/cryptography/bcrypt";

export class BcryptEncryptCryptographyFactory {
  static create() {
    return new BcryptEncryptCryptographyAdapter();
  }
}
