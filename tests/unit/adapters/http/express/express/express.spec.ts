import { makeSut } from "./mock";

jest.mock("express", () => {
  const express = () => ({
    use: jest.fn(),
    listen: jest.fn(),
  });

  express.json = jest.fn();
  express.Router = jest.fn(() => ({
    use: jest.fn(),
  }));

  return express;
});

jest.mock("cors", () => jest.fn());

describe("Express Adapter", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call database.connect one time", () => {
    const { sut, databaseStub } = makeSut();
    const connectSpy = jest.spyOn(databaseStub, "connect");

    sut.execute();

    expect(connectSpy).toHaveBeenCalled();
    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it("should call Express.json one time", () => {
    const expressJsonSpy = jest.spyOn(require("express"), "json");
    const { sut } = makeSut();

    sut.execute();

    expect(expressJsonSpy).toHaveBeenCalled();
    expect(expressJsonSpy).toHaveBeenCalledTimes(1);
  });

  it("should call cors one time", () => {
    const corsMock = require("cors");
    const { sut } = makeSut();

    sut.execute();

    expect(corsMock).toHaveBeenCalled();
    expect(corsMock).toHaveBeenCalledTimes(1);
  });

  it("should call router for each route adapter", () => {
    const expressRouterSpy = jest.spyOn(require("express"), "Router");
    const { sut } = makeSut();

    sut.execute();

    expect(expressRouterSpy).toHaveBeenCalled();
    expect(expressRouterSpy).toHaveBeenCalledTimes(1);
  });
});
