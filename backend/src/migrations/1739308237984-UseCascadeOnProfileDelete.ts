import { MigrationInterface, QueryRunner } from "typeorm";

export class UseCascadeOnProfileDelete1739308237984 implements MigrationInterface {
    name = 'UseCascadeOnProfileDelete1739308237984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22" FOREIGN KEY ("email") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22" FOREIGN KEY ("email") REFERENCES "profile"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
