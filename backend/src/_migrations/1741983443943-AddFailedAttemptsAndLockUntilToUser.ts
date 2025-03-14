import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFailedAttemptsAndLockUntilToUser1741983443943 implements MigrationInterface {
    name = 'AddFailedAttemptsAndLockUntilToUser1741983443943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "failedAttempts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lockUntil" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lockUntil"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "failedAttempts"`);
    }

}
