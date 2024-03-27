import "dotenv/config";
import { verify } from "jsonwebtoken";
import "reflect-metadata";

jest.mock("express", () => {
  const express = () => ({
    use: jest.fn(),
    listen: jest.fn(),
  });

  express.json = jest.fn();
  express.Router = jest.fn(() => ({
    use: jest.fn(),
    post: jest.fn(),
  }));

  return express;
});

jest.mock("cors", () => jest.fn());


