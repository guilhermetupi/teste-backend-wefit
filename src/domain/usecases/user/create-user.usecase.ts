import { CreateUserCommand } from "@/domain/commands";
import {
  InvalidParamError,
  ConflictError,
  InternalServerError,
} from "@/domain/errors";
import {
  CreateUserRepositoryPort,
  FindUserByEmailRepositoryPort,
} from "@/ports/database/repositories/user";
import { CreateUserUseCasePort } from "@/ports/usecases/user";
import {
  EmailValidationPort,
  PasswordValidationPort,
} from "@/ports/validations";

export class CreateUserUseCase implements CreateUserUseCasePort {
  constructor(
    private readonly createUserRepository: CreateUserRepositoryPort,
    private readonly findUserByEmailRepository: FindUserByEmailRepositoryPort
  ) {}

  async execute(
    user: CreateUserUseCasePort.Param
  ): Promise<CreateUserUseCasePort.Response> {
    const emailAlreadyInUse = await this.checkIfEmailIsAlreadyInUse(
      user.email.value
    );

    if (emailAlreadyInUse) {
      return emailAlreadyInUse;
    }

    const createdUser = await this.createUserRepository.execute(user);

    if (createdUser instanceof InternalServerError) {
      return new InternalServerError();
    }

    return createdUser.id;
  }

  private async checkIfEmailIsAlreadyInUse(
    email: string
  ): Promise<false | InternalServerError | ConflictError> {
    const userAlreadyExists = await this.findUserByEmailRepository.execute(
      email
    );

    if (userAlreadyExists instanceof InternalServerError) {
      return new InternalServerError();
    }

    if (userAlreadyExists) {
      return new ConflictError("User already exists.");
    }

    return false;
  }
}
