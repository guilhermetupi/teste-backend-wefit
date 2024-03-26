import { SigninUseCase } from "@/domain/usecases/auth";
import { SigninUseCasePort } from "@/ports/usecases/auth";
import { GenerateTokenJwtFactory } from "../../token/jsonwebtoken";
import { TypeOrmFindUserByEmailRepositoryFactory } from "../../database/orm/repositories/users";
import { BcryptCompareCryptographyFactory } from "../../cryptography/bcrypt";

export class SigninUseCaseFactory {
  static create(): SigninUseCasePort {
    const findUserByEmailRepository =
      TypeOrmFindUserByEmailRepositoryFactory.create();
    const compareCryptographyAdapter =
      BcryptCompareCryptographyFactory.create();
    const generateTokenAdapter = GenerateTokenJwtFactory.create();

    return new SigninUseCase(
      findUserByEmailRepository,
      compareCryptographyAdapter,
      generateTokenAdapter
    );
  }
}
