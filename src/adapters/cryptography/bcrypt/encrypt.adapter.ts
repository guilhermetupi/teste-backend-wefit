import { Environment } from "@/config/env";
import { EncryptCryptographyPort } from "@/ports/cryptography";
import { hashSync } from "bcrypt";

export class BcryptEncryptCryptographyAdapter
  implements EncryptCryptographyPort
{
  execute(plaintext: string): string {
    return hashSync(plaintext, Environment.saltRounds);
  }
}
