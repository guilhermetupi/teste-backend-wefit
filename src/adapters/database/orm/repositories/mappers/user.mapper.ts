import { User } from "@/domain/entities";
import { UsersModel } from "../../models";
import { Email, Password } from "@/domain/value-objects";
import { InvalidParamError } from "@/domain/errors";

export class UserMapper {
  static toPersistence(userEntity: User): UsersModel {
    return {
      email: userEntity.email.value,
      password: userEntity.password?.value as string,
    };
  }

  static toEntity(userPersistence: UsersModel, passwordRequiresValidation = true): User {
    const { email, password } = this.createValueObjects(userPersistence, passwordRequiresValidation);

    return new User(email, password, userPersistence.id);
  }

  private static createValueObjects(userPersistence: UsersModel, passwordRequiresValidation = true) {
    const email = Email.create(userPersistence.email);

    if (email instanceof InvalidParamError) {
      throw email;
    }

    let password: Password | undefined;
    if (userPersistence.password) {
      const passwordValueObject = Password.create(userPersistence.password, passwordRequiresValidation);

      if (passwordValueObject instanceof InvalidParamError) {
        throw passwordValueObject;
      }

      password = passwordValueObject;
    }

    return { email, password };
  }
}
