import { GenerateTokenPort } from "@/ports/token";
import { SignupUseCasePort } from "@/ports/usecases/auth";
import { CreateUserUseCasePort } from "@/ports/usecases/user";
import { CreateUserCommand } from "@/domain/commands";
import {
  ConflictError,
  InternalServerError,
  InvalidParamError,
} from "@/domain/errors";

export class SignupUseCase implements SignupUseCasePort {
  constructor(
    private readonly createUserUseCase: CreateUserUseCasePort,
    private readonly generateTokenAdapter: GenerateTokenPort
  ) {}

  async execute(
    user: SignupUseCasePort.Param
  ): Promise<SignupUseCasePort.Response> {
    const userId = await this.createUserAndGetId(user);

    if (userId instanceof Error) {
      return userId;
    }

    const token = this.generateTokenAdapter.execute({ id: userId });

    return token;
  }

  private async createUserAndGetId(
    createUserCommand: CreateUserCommand
  ): Promise<string | InvalidParamError | ConflictError | InternalServerError> {
    const userId = await this.createUserUseCase.execute(createUserCommand);

    return userId;
  }
}
