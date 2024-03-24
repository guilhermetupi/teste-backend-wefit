import jwt from "jsonwebtoken";
import { VerifyTokenPort } from "@/ports/token";
import { JwtAdapter } from "./jwt.adapter";

export class VerifyTokenJwtAdapter
  extends JwtAdapter
  implements VerifyTokenPort
{
  execute(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
