import { CompareCryptographyPort } from "@/ports/cryptography";
import { compareSync } from "bcrypt";

export class BcryptCompareCryptographyAdapter
  implements CompareCryptographyPort
{
  execute({
    plainText,
    hashed,
  }: CompareCryptographyPort.Params): CompareCryptographyPort.Response {
    return compareSync(plainText, hashed);
  }
}
