import { makeSut } from "./mock";

describe("Typeorm Adapter", () => {
  it("should call dataSource.initialize one time", async () => {
    const { sut, dataSourceStub } = makeSut();
    const initializeSpy = jest.spyOn(dataSourceStub, "initialize");

    await sut.connect();

    expect(initializeSpy).toHaveBeenCalledTimes(1);
  });
});
