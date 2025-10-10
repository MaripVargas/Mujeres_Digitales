import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColunm1760125929794 implements MigrationInterface {
    name = 'AddRoleColunm1760125929794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
