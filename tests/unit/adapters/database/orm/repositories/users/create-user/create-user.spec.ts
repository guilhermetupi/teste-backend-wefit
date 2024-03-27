import { Repository } from "typeorm";
import { makeSut } from "./mock";
import { UsersModel } from "@/adapters/database/orm/models";
import { AppDataSource } from "@/config/orm";
import { User } from "@/domain/entities";
import { Email, Password } from "@/domain/value-objects";
import { UserMapper } from "@/adapters/database/orm/repositories/mappers";
import { InternalServerError } from "@/domain/errors";

describe("CreateUserRepository Typeorm", () => {
  let usersRepository: Repository<UsersModel>;
  let userEntity: User = {
    email: Email.create("any_email") as Email,
    password: Password.create("Any_p4ssword") as Password,
  };
  let userModel = {
    id: expect.any(String),
    email: "any_email",
    password: "Any_p4ssword",
  } as UsersModel;

  beforeAll(async () => {
    await AppDataSource.initialize();
    usersRepository = AppDataSource.getRepository(UsersModel);
  });

  beforeEach(async () => {
    await usersRepository.clear();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should call UserMapper.toPersistence with correct values", async () => {
    const { sut } = makeSut();
    const toPersistenceSpy = jest.spyOn(UserMapper, "toPersistence");

    await sut.execute(userEntity);

    expect(toPersistenceSpy).toHaveBeenCalledWith(userEntity);
  });

  it("should call UserMapper.toEntity with correct values", async () => {
    const { sut } = makeSut();
    const toEntitySpy = jest.spyOn(UserMapper, "toEntity");

    await sut.execute(userEntity);

    expect(toEntitySpy).toHaveBeenCalledWith(userModel);
  });

  it("should return an User on success", async () => {
    const { sut } = makeSut();

    const user = await sut.execute(userEntity);

    expect(user).toEqual({ ...userEntity, id: expect.any(String) });
  });

  it("should return an InternalServerError if repository.save throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(usersRepository, "save").mockImplementationOnce(() => {
      throw new Error();
    });

    const user = await sut.execute(userEntity);

    expect(user).toEqual(new InternalServerError());
  });
});
