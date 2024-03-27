import { Repository } from "typeorm";
import { makeSut } from "./mock";
import { UsersModel } from "@/adapters/database/orm/models";
import { AppDataSource } from "@/config/orm";
import { User } from "@/domain/entities";
import { Email, Password } from "@/domain/value-objects";
import { UserMapper } from "@/adapters/database/orm/repositories/mappers";
import { InternalServerError } from "@/domain/errors";

describe("FindUserById Typeorm", () => {
  let usersRepository: Repository<UsersModel>;
  let userId: string;
  let userEntity: User;
  let userModel = {
    email: "any@email.com",
    password: "Any_p4ssword",
  } as UsersModel;

  beforeAll(async () => {
    await AppDataSource.initialize();
    usersRepository = AppDataSource.getRepository(UsersModel);

    const { id } = await usersRepository.save(userModel);

    userId = id as string;
    userEntity = {
      id: userId,
      email: Email.create("any@email.com") as Email,
      password: Password.create("Any_p4ssword") as Password,
    };
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should call UserMapper.toEntity with correct values", async () => {
    const { sut } = makeSut();
    const toEntitySpy = jest.spyOn(UserMapper, "toEntity");

    await sut.execute(userEntity.id as string);

    expect(toEntitySpy).toHaveBeenCalledWith({
      id: userModel.id,
      email: userModel.email,
    });
  });

  it("should call repository.findOne with correct values", async () => {
    const { sut } = makeSut();
    const findOneSpy = jest.spyOn(usersRepository, "findOne");

    await sut.execute(userEntity.id as string);

    expect(findOneSpy).toHaveBeenCalledWith({
      where: { id: userEntity.id as string },
    });
  });

  it("should return an User on success", async () => {
    const { sut } = makeSut();

    const user = await sut.execute(userEntity.id as string);

    expect(user).toEqual({
      id: userEntity.id,
      email: userEntity.email,
    });
  });

  it("should return undefined if user not found", async () => {
    const { sut } = makeSut();

    const user = await sut.execute("not_found_id");

    expect(user).toBeUndefined();
  });

  it("should return an InternalServerError if repository.findOne throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(usersRepository, "findOne").mockRejectedValueOnce(new Error());

    const result = await sut.execute(userEntity.id as string);

    expect(result).toEqual(new InternalServerError());
  });
});
