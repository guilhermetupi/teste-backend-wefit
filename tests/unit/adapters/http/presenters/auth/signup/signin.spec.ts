import { makeSut } from "./mock";
import {
  ConflictError,
  InternalServerError,
  InvalidParamError,
  UnauthorizedError,
} from "@/domain/errors";
import { HttpStatusCode } from "@/types/http";

describe("SigninPresenter", () => {
  const data = {
    email: "any_email",
    password: "any_password",
    passwordConfirmation: "any_password",
  };

  it("should return error 500 if use case returns an InternalServerError", async () => {
    const { sut, signupUseCaseStub } = makeSut();
    jest
      .spyOn(signupUseCaseStub, "execute")
      .mockResolvedValue(new InternalServerError());

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(response.message).toBe("Internal Server Error");
  });

  it("should return error 409 if use case returns an ConflictError", async () => {
    const { sut, signupUseCaseStub } = makeSut();
    jest
      .spyOn(signupUseCaseStub, "execute")
      .mockResolvedValue(new ConflictError("any_message"));

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.CONFLICT);
    expect(response.message).toBe("any_message");
  });

  it("should return error 400 if use case returns an InvalidParamError", async () => {
    const { sut, signupUseCaseStub } = makeSut();
    jest
      .spyOn(signupUseCaseStub, "execute")
      .mockResolvedValue(new InvalidParamError("any_message"));

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("any_message");
  });

  it("should return error 400 if use case throws", async () => {
    const { sut, signupUseCaseStub } = makeSut();
    jest
      .spyOn(signupUseCaseStub, "execute")
      .mockRejectedValue(new InvalidParamError("any_message"));

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("any_message");
  });

  it("should return error 400 if password and passwordConfirmation does not match", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...data,
      passwordConfirmation: "other_password",
    });

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.message).toBe("Senhas não conferem.");
  });

  it("should return status 201 and data if use case returns a valid data", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(data);

    expect(response.status).toBe(HttpStatusCode.CREATED);
    expect(response.data).toEqual({ accessToken: "any_token" });
  });
});
