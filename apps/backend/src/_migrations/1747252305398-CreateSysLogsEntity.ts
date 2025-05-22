import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSysLogsEntity1747252305398 implements MigrationInterface {
  name = 'CreateSysLogsEntity1747252305398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sys_log_level_enum" AS ENUM('info', 'warn', 'error', 'debug')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sys_log" ("id" SERIAL NOT NULL, "level" "public"."sys_log_level_enum" NOT NULL, "message" character varying NOT NULL, "context" character varying, "stack" text, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a820dafdcd358af9d85bff206eb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sys_log"`);
    await queryRunner.query(`DROP TYPE "public"."sys_log_level_enum"`);
  }
}
