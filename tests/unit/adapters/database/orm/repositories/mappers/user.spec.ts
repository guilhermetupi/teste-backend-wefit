import { UsersModel } from "@/adapters/database/orm/models";
import { UserMapper } from "@/adapters/database/orm/repositories/mappers";
import { User } from "@/domain/entities";
import { InvalidParamError } from "@/domain/errors";
import { Email, Password } from "@/domain/value-objects";

describe("UserMapper", () => {
  let userId = "any_id";
  let userEntity: User = {
    id: userId,
    email: Email.create("any@email.com") as Email,
    password: Password.create("Any_p4ssword") as Password,
  };
  let userModel = {
    email: "any@email.com",
    password: "Any_p4ssword",
  } as UsersModel;

  describe("toEntity", () => {
    it("should return a valid user entity", () => {
      const userEntity = UserMapper.toEntity(userModel);

      expect(userEntity).toEqual(userEntity);
    });

    it("should return a valid user entity without password", () => {
      const userEntity = UserMapper.toEntity({
        ...userModel,
        password: undefined,
      });

      expect(userEntity).toEqual({ ...userEntity, password: undefined });
    });

    it("should throw an error when email is invalid", () => {
      try {
        UserMapper.toEntity({ ...userModel, email: "invalid_email" });
      } catch (e) {
        expect(e).toEqual(new InvalidParamError("Email inválido."));
        return;
      }

      throw new Error("Should throw an InvalidParamError('Email inválido.')");
    });
  });

  describe("toPersistence", () => {
    it("should return a valid user model", () => {
      const userPersistence = UserMapper.toPersistence(userEntity);

      expect(userPersistence).toEqual(userModel);
    });
  });
});
