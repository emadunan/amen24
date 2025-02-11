import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntities1738953572535 implements MigrationInterface {
  name = 'CreateUserEntities1738953572535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "password" character varying, "provider" character varying NOT NULL DEFAULT 'local', "providerId" character varying, "email" character varying NOT NULL, "displayName" character varying NOT NULL, "photoUri" character varying, "isActive" boolean NOT NULL DEFAULT true, "profileEmail" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("email" character varying NOT NULL, "privilege" character varying NOT NULL DEFAULT 'member', "lastLogin" TIMESTAMP, "currentBook" character varying NOT NULL DEFAULT 'GEN', "currentChapter" integer NOT NULL DEFAULT '1', "fontSize" integer NOT NULL DEFAULT '1', "diacrited" boolean NOT NULL DEFAULT true, "darkMode" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3825121222d5c17741373d8ad13" PRIMARY KEY ("email"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_61f8a37295178c7f927f1bcc7de" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_61f8a37295178c7f927f1bcc7de"`,
    );
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
