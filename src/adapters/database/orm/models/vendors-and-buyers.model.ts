import { PersonTypeEnum } from "@/domain/types/entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("vendors_and_buyers")
export class VendorsAndBuyersModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "simple-enum", enum: PersonTypeEnum })
  personType: PersonTypeEnum;

  @Column({ type: "varchar", nullable: true })
  cnpj?: string;

  @Column({ type: "varchar" })
  cpf: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  cellphone: string;

  @Column({ type: "varchar" })
  telephone: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  cep: string;

  @Column({ type: "varchar" })
  address: string;

  @Column({ type: "varchar" })
  number: string;

  @Column({ type: "varchar", nullable: true })
  complement?: string;

  @Column({ type: "varchar" })
  neighborhood: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar" })
  state: string;
}
