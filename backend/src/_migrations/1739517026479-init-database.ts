import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1739517026479 implements MigrationInterface {
  name = 'InitDatabase1739517026479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "num" integer NOT NULL, "bookId" integer, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."verse_language_enum" AS ENUM('en', 'ar', 'he', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'tr', 'fa', 'ur', 'hi', 'bn', 'id', 'ms', 'th', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'hu', 'ro', 'el', 'uk', 'vi', 'sr', 'hr', 'bg', 'sk', 'sl', 'lt', 'lv', 'et', 'tl', 'sw')`,
    );
    await queryRunner.query(
      `CREATE TABLE "verse" ("id" SERIAL NOT NULL, "num" integer NOT NULL, "text" character varying NOT NULL, "textNormalized" character varying NOT NULL, "language" "public"."verse_language_enum" NOT NULL, "chapterId" integer, CONSTRAINT "PK_1bf192a2ee81fa999f9a75939e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("email" character varying NOT NULL, "privilege" character varying NOT NULL DEFAULT 'member', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP NOT NULL DEFAULT now(), "currentBook" character varying NOT NULL DEFAULT 'GEN', "currentChapter" integer NOT NULL DEFAULT '1', "uilanguage" character varying, "fontSize" integer NOT NULL DEFAULT '1', "diacrited" boolean NOT NULL DEFAULT true, "darkMode" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3825121222d5c17741373d8ad13" PRIMARY KEY ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying, "provider" character varying NOT NULL DEFAULT 'local', "providerId" character varying, "email" character varying NOT NULL, "displayName" character varying NOT NULL, "photoUri" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter" ADD CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse" ADD CONSTRAINT "FK_5784019838c4e9808ba55d81f82" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22" FOREIGN KEY ("email") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse" DROP CONSTRAINT "FK_5784019838c4e9808ba55d81f82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapter" DROP CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "verse"`);
    await queryRunner.query(`DROP TYPE "public"."verse_language_enum"`);
    await queryRunner.query(`DROP TABLE "chapter"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
