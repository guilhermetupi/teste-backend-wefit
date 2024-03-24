import { Email, Password } from "../value-objects";

export class CreateUserCommand {
  constructor(
    public readonly email: Email,
    public readonly password: Password,
    public readonly passwordConfirmation: string
  ) {}
}
