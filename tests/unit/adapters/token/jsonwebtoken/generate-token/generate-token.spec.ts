import jwt from "jsonwebtoken";
import { makeSut } from "./mock";
import { InternalServerError } from "@/domain/errors";

jest.mock("@/config/env", () => ({
  Environment: {
    tokenData: {
      secret: "any_secret",
      accessTokenExpiresIn: "1d",
    },
  },
}));

describe("GenerateTokenAdapter JWT", () => {
  const payload = { id: "any_id" };

  it("should call sign with correct values", () => {
    const signSpy = jest.spyOn(jwt, "sign");
    const { sut } = makeSut();

    sut.execute(payload);

    expect(signSpy).toHaveBeenCalledWith(payload, "any_secret", {
      expiresIn: "1d",
    });
  });

  it("should return a token on success", () => {
    const { sut } = makeSut();

    const response = sut.execute(payload) as { accessToken: string };

    expect(response.accessToken).toBeTruthy();
  });

  it("should return an InternalServerError on sign throws", () => {
    const { sut } = makeSut();
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      throw new Error();
    });

    const response = sut.execute(payload) as InternalServerError;

    expect(response.message).toBe("Internal Server Error");
  });
});
