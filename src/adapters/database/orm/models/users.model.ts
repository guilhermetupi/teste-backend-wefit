import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UsersModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;
}
