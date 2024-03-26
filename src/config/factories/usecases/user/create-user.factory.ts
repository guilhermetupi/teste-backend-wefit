import { CreateUserUseCase } from "@/domain/usecases/user";
import { CreateUserUseCasePort } from "@/ports/usecases/user";
import {
  TypeOrmCreateUserRepositoryFactory,
  TypeOrmFindUserByEmailRepositoryFactory,
} from "../../database/orm/repositories/users";
import { BcryptEncryptCryptographyFactory } from "../../cryptography/bcrypt";

export class CreateUserUseCaseFactory {
  static create(): CreateUserUseCasePort {
    const createUserRepository = TypeOrmCreateUserRepositoryFactory.create();
    const findUserByEmailRepository =
      TypeOrmFindUserByEmailRepositoryFactory.create();
    const encryptAdapter = BcryptEncryptCryptographyFactory.create();

    return new CreateUserUseCase(
      createUserRepository,
      findUserByEmailRepository,
      encryptAdapter
    );
  }
}
