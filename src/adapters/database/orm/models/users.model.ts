import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VendorsAndBuyersModel } from "./vendors-and-buyers.model";

@Entity("users")
export class UsersModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", select: false })
  password?: string;

  // @OneToMany(() => VendorsAndBuyersModel, (vendorOrBuyer) => vendorOrBuyer.user)
  // vendorsAndBuyers?: VendorsAndBuyersModel[];
}
