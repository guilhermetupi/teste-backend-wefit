import { User } from "@/domain/entities";
import { UsersModel } from "../../models";
import { Email, Password } from "@/domain/value-objects";
import { InvalidParamError } from "@/domain/errors";

export class UserMapper {
  static toPersistence(userEntity: User): UsersModel {
    return {
      email: userEntity.email.value,
      password: userEntity.password.value,
    };
  }

  static toEntity(userPersistence: UsersModel): User {
    const { email, password } = this.createValueObjects(userPersistence);

    return new User(email, password, userPersistence.id);
  }

  private static createValueObjects(userPersistence: UsersModel) {
    const email = Email.create(userPersistence.email);

    if (email instanceof InvalidParamError) {
      throw email;
    }

    const password = Password.create(userPersistence.password);

    if (password instanceof InvalidParamError) {
      throw password;
    }

    return { email, password };
  }
}
