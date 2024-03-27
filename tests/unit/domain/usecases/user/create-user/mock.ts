import { User } from "@/domain/entities";
import { CreateUserUseCase } from "@/domain/usecases/user";
import { EncryptCryptographyPort } from "@/ports/cryptography";
import {
  CreateUserRepositoryPort,
  FindUserByEmailRepositoryPort,
} from "@/ports/database/repositories/user";

class CreateUserRepositoryStub implements CreateUserRepositoryPort {
  async execute(user: User): Promise<CreateUserRepositoryPort.Response> {
    return new Promise<Omit<User, "password">>((res) =>
      res({
        email: user.email,
        id: "any_id",
      })
    );
  }
}

class FindUserByEmailRepositoryStub implements FindUserByEmailRepositoryPort {
  async execute(
    email: string
  ): Promise<FindUserByEmailRepositoryPort.Response> {
    return new Promise<undefined>((res) => res(undefined));
  }
}

class EncryptCryptographyAdapterStub implements EncryptCryptographyPort {
  execute(plainText: EncryptCryptographyPort.Params) {
    return "hashed_password";
  }
}

export function makeSut() {
  const createUserRepositoryStub = new CreateUserRepositoryStub();
  const findUserByEmailRepositoryStub = new FindUserByEmailRepositoryStub();
  const encrypterAdapterStub = new EncryptCryptographyAdapterStub();
  const sut = new CreateUserUseCase(
    createUserRepositoryStub,
    findUserByEmailRepositoryStub,
    encrypterAdapterStub
  );

  return {
    sut,
    createUserRepositoryStub,
    findUserByEmailRepositoryStub,
    encrypterAdapterStub,
  };
}
