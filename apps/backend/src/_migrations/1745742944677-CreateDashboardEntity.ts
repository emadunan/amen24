import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDashboardEntity1745742944677 implements MigrationInterface {
  name = 'CreateDashboardEntity1745742944677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dashboard" ("id" SERIAL NOT NULL, "date" date NOT NULL, "visits" integer NOT NULL DEFAULT '0', "searchCount" integer NOT NULL DEFAULT '0', "bibleAccessCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_5f86b6b9af92cbb85548f151c76" UNIQUE ("date"), CONSTRAINT "PK_233ed28fa3a1f9fbe743f571f75" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dashboard"`);
  }
}
