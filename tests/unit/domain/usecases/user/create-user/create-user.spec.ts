import { InternalServerError, InvalidParamError } from "@/domain/errors";
import { makeSut } from "./mock";
import { Password } from "@/domain/value-objects";

describe("CreateUserUseCase", () => {
  const user = {
    email: { value: "any_email" },
    password: { value: "Any_p4ssword" },
  } as any;

  it("should return an InternalServerError if findUserByEmailRepository throws it", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, "execute")
      .mockResolvedValue(new InternalServerError());

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("Internal Server Error");
  });

  it("should return an InvalidParamError if Password.create throws it", async () => {
    const { sut } = makeSut();
    jest
      .spyOn(Password, "create")
      .mockReturnValueOnce(new InvalidParamError("password"));

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("password");
  });

  it("should return a ConflictError if email is already in use", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, "execute").mockResolvedValue({
      email: user.email,
      password: undefined,
      id: "any_id",
    });

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("Usuário já cadastrado.");
  });

  it("should return an InternalServerError if createUserRepository throws it", async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    jest
      .spyOn(createUserRepositoryStub, "execute")
      .mockResolvedValueOnce(new InternalServerError());

    const response = (await sut.execute(user)) as Error;

    expect(response.message).toBe("Internal Server Error");
  });

  it("should call findUserByEmailRepository with correct values", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const executeSpy = jest.spyOn(findUserByEmailRepositoryStub, "execute");

    await sut.execute(user);

    expect(executeSpy).toHaveBeenCalledWith(user.email.value);
  });

  it("should call encrypterAdapter with correct values", async () => {
    const { sut, encrypterAdapterStub } = makeSut();
    const executeSpy = jest.spyOn(encrypterAdapterStub, "execute");

    await sut.execute(user);

    expect(executeSpy).toHaveBeenCalledWith(user.password.value);
  });

  it("should call Password.create with correct values", async () => {
    const { sut } = makeSut();
    const createSpy = jest.spyOn(Password, "create");

    await sut.execute(user);

    expect(createSpy).toHaveBeenCalledWith("hashed_password", false);
  });

  it("should call createUserRepository with correct values", async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    const executeSpy = jest.spyOn(createUserRepositoryStub, "execute");

    await sut.execute(user);

    expect(executeSpy).toHaveBeenCalledWith({
      email: user.email,
      password: expect.anything(),
    });
  });

  it("should return the created user id", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(user);

    expect(response).toBe("any_id");
  });
});
