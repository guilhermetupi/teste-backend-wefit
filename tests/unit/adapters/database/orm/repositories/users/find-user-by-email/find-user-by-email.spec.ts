import { Repository } from "typeorm";
import { makeSut } from "./mock";
import { UsersModel } from "@/adapters/database/orm/models";
import { AppDataSource } from "@/config/orm";
import { User } from "@/domain/entities";
import { Email, Password } from "@/domain/value-objects";
import { UserMapper } from "@/adapters/database/orm/repositories/mappers";
import { InternalServerError } from "@/domain/errors";

describe("FindUserByEmail Typeorm", () => {
  let usersRepository: Repository<UsersModel>;
  let userId: string;
  let userEntity: User;
  let userModel = {
    email: "any_email",
    password: "Any_p4ssword",
  } as UsersModel;

  beforeAll(async () => {
    await AppDataSource.initialize();
    usersRepository = AppDataSource.getRepository(UsersModel);

    const { id } = await usersRepository.save(userModel);

    userId = id as string;
    userEntity = {
      id: userId,
      email: Email.create("any_email") as Email,
      password: Password.create("Any_p4ssword") as Password,
    };
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should call UserMapper.toEntity with correct values", async () => {
    const { sut } = makeSut();
    const toEntitySpy = jest.spyOn(UserMapper, "toEntity");

    await sut.execute(userEntity.email.value);

    expect(toEntitySpy).toHaveBeenCalledWith(userModel, false);
  });

  it("should call repository.findOne with correct values", async () => {
    const { sut } = makeSut();
    const findOneSpy = jest.spyOn(usersRepository, "findOne");

    await sut.execute(userEntity.email.value);

    expect(findOneSpy).toHaveBeenCalledWith({
      select: ["id", "email", "password"],
      where: { email: userEntity.email.value },
    });
  });

  it("should return an User on success", async () => {
    const { sut } = makeSut();

    const user = await sut.execute(userEntity.email.value);

    expect(user).toEqual(userEntity);
  });

  it("should return undefined if user not found", async () => {
    const { sut } = makeSut();

    const user = await sut.execute("not_found_email");

    expect(user).toBeUndefined();
  });

  it("should return an InternalServerError if repository.findOne throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(usersRepository, "findOne").mockRejectedValueOnce(new Error());

    const result = await sut.execute(userEntity.email.value);

    expect(result).toEqual(new InternalServerError());
  });
});
