import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtProfile1739114796230 implements MigrationInterface {
    name = 'AddCreatedAtProfile1739114796230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_61f8a37295178c7f927f1bcc7de"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileEmail"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "lastLogin" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "lastLogin" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22" FOREIGN KEY ("email") REFERENCES "profile"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "lastLogin" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "lastLogin" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_61f8a37295178c7f927f1bcc7de" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
