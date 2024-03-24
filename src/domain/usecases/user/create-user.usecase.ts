import { User } from "@/domain/entities";
import { ConflictError, InternalServerError, InvalidParamError } from "@/domain/errors";
import { Password } from "@/domain/value-objects";
import { EncryptCryptographyPort } from "@/ports/cryptography";
import {
  CreateUserRepositoryPort,
  FindUserByEmailRepositoryPort,
} from "@/ports/database/repositories/user";
import { CreateUserUseCasePort } from "@/ports/usecases/user";

export class CreateUserUseCase implements CreateUserUseCasePort {
  constructor(
    private readonly createUserRepository: CreateUserRepositoryPort,
    private readonly findUserByEmailRepository: FindUserByEmailRepositoryPort,
    private readonly encrypterAdapter: EncryptCryptographyPort
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

    const hashedPassword = this.encrypterAdapter.execute(user.password.value);
    const hashedPasswordValueObject = Password.create(hashedPassword, false);

    if (hashedPasswordValueObject instanceof InvalidParamError) {
      return hashedPasswordValueObject;
    }

    const userWithHashedPassword = new User(
      user.email,
      hashedPasswordValueObject
    );

    const createdUser = await this.createUserRepository.execute(userWithHashedPassword);

    if (createdUser instanceof InternalServerError) {
      return new InternalServerError();
    }

    return createdUser.id as string;
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
