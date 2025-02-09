import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToUser1739126206681 implements MigrationInterface {
    name = 'AddUniqueConstraintToUser1739126206681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259"`);
    }

}
