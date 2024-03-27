import bcrypt from "bcrypt";
import { makeSut } from "./mock";

jest.mock("@/config/env", () => ({
  Environment: {
    saltRounds: 2,
  },
}));

describe("EncryptCryptographyAdapter Bcrypt", () => {
  it("should call encryptSync with correct values", () => {
    const { sut } = makeSut();
    const encryptSpy = jest.spyOn(bcrypt, "hashSync");

    sut.execute("any_value");

    expect(encryptSpy).toHaveBeenCalledWith("any_value", 2);
  });

  it("should return hashed string", () => {
    const { sut } = makeSut();

    const response = sut.execute("any_value");

    expect(response).toBeTruthy();
  });

  it("should return hashed string comparable to plain text", () => {
    const { sut } = makeSut();

    const response = sut.execute("any_value");

    const comaparison = bcrypt.compareSync("any_value", response);

    expect(comaparison).toBe(true);
  });
});
