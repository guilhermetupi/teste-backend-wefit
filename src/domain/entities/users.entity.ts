import { Email, Password } from "@/domain/value-objects";

export class User {
  constructor(
    public readonly email: Email,
    public readonly password: Password
  ) {}
}
