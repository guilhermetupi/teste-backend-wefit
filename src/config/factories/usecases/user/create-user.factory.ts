import { CreateUserUseCase } from "@/domain/usecases/user";
import { CreateUserUseCasePort } from "@/ports/usecases/user";
import {
  typeOrmCreateUserRepository,
  typeOrmFindUserByEmailRepository,
} from "../../database/orm/repositories/users";
import { bcryptEncryptCryptography } from "../../cryptography/bcrypt";

class CreateUserUseCaseFactory {
  static create(): CreateUserUseCasePort {
    return new CreateUserUseCase(
      typeOrmCreateUserRepository,
      typeOrmFindUserByEmailRepository,
      bcryptEncryptCryptography
    );
  }
}

export const createUserUseCase = CreateUserUseCaseFactory.create();
