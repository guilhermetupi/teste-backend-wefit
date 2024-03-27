import bcrypt from "bcrypt";
import { makeSut } from "./mock";

describe("CompareCryptographyAdapter Bcrypt", () => {
  it("should call compareSync with correct values", () => {
    const { sut } = makeSut();
    const compareSpy = jest.spyOn(bcrypt, "compareSync");

    sut.execute({ plainText: "any_value", hashed: "any_hash" });

    expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
  });

  it("should return true on success", () => {
    const { sut } = makeSut();
    const hashed = bcrypt.hashSync("any_value", 12);

    const response = sut.execute({
      plainText: "any_value",
      hashed: hashed,
    });

    expect(response).toBe(true);
  });

  it("should return false on fail", () => {
    const { sut } = makeSut();
    const hashed = bcrypt.hashSync("any_value", 12);

    const response = sut.execute({
      plainText: "other_value",
      hashed: hashed,
    });

    expect(response).toBe(false);
  });
});
