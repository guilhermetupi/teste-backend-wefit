import { User } from "@/domain/entities";
import { UsersModel } from "../../models";
import { Email, Password } from "@/domain/value-objects";

export class UserMapper {
  static toPersistence(userEntity: User): UsersModel {
    return {
      email: userEntity.email.value,
      password: userEntity.password?.value as string,
    };
  }

  static toEntity(
    userPersistence: UsersModel,
    passwordRequiresValidation = false
  ): User {
    const { email, password } = this.createValueObjects(
      userPersistence,
      passwordRequiresValidation
    );

    return new User(email, password, userPersistence.id);
  }

  private static createValueObjects(
    userPersistence: UsersModel,
    passwordRequiresValidation: boolean
  ) {
    const email = Email.create(userPersistence.email);

    if (email instanceof Error) {
      throw email;
    }

    let password: Password | undefined;
    if (userPersistence.password) {
      const passwordValueObject = Password.create(
        userPersistence.password,
        passwordRequiresValidation
      );

      if (passwordValueObject instanceof Error) {
        throw passwordValueObject;
      }

      password = passwordValueObject;
    }

    return { email, password };
  }
}
