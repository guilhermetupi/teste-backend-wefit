import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVendorsAndBuyersTable1711430996917 implements MigrationInterface {
    name = 'CreateVendorsAndBuyersTable1711430996917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vendors_and_buyers\` (\`id\` varchar(36) NOT NULL, \`person_type\` enum ('Pessoa Física', 'Pessoa Jurídica') NOT NULL, \`cnpj\` varchar(255) NULL, \`cpf\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`mobile_phone\` varchar(11) NOT NULL, \`telephone\` varchar(10) NOT NULL, \`email\` varchar(255) NOT NULL, \`cep\` varchar(8) NOT NULL, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`complement\` varchar(255) NULL, \`neighborhood\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vendors_and_buyers\` ADD CONSTRAINT \`FK_84241a53b6d8e36735f4612907d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendors_and_buyers\` DROP FOREIGN KEY \`FK_84241a53b6d8e36735f4612907d\``);
        await queryRunner.query(`DROP TABLE \`vendors_and_buyers\``);
    }

}
