import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuditingEntity1745743042015 implements MigrationInterface {
    name = 'CreateAuditingEntity1745743042015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auditing" ("id" SERIAL NOT NULL, "action" text NOT NULL, "performedBy" text NOT NULL, "metadata" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_94aa783e60ca6ba3fcf56d4698a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auditing"`);
    }

}
