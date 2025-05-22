import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBibleGlossaryEntity1747309143203
  implements MigrationInterface
{
  name = 'CreateBibleGlossaryEntity1747309143203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bible_glossary_translation" ("id" SERIAL NOT NULL, "lang" text NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "glossaryId" integer, CONSTRAINT "UQ_51cda7e87135acf100cdb949f71" UNIQUE ("lang", "glossaryId"), CONSTRAINT "PK_a657fab55ae999ad7850ea87d03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bible_glossary" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_e17e43fb7bcf92a51e93db0562e" UNIQUE ("slug"), CONSTRAINT "PK_abee3c3e87ea3de9728ebb16537" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bible_glossary_verses" ("glossaryId" integer NOT NULL, "verseId" integer NOT NULL, CONSTRAINT "PK_9c3752fc07a0fcfe63ee43b9fc9" PRIMARY KEY ("glossaryId", "verseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e8cb217abe698d2a0b7007c2c" ON "bible_glossary_verses" ("glossaryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4698d12e10faced14f46fc703a" ON "bible_glossary_verses" ("verseId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" ADD CONSTRAINT "FK_2502c3ef7d02351daa84695522a" FOREIGN KEY ("glossaryId") REFERENCES "bible_glossary"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_verses" ADD CONSTRAINT "FK_1e8cb217abe698d2a0b7007c2cd" FOREIGN KEY ("glossaryId") REFERENCES "bible_glossary"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_verses" ADD CONSTRAINT "FK_4698d12e10faced14f46fc703a9" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_verses" DROP CONSTRAINT "FK_4698d12e10faced14f46fc703a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_verses" DROP CONSTRAINT "FK_1e8cb217abe698d2a0b7007c2cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" DROP CONSTRAINT "FK_2502c3ef7d02351daa84695522a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4698d12e10faced14f46fc703a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1e8cb217abe698d2a0b7007c2c"`,
    );
    await queryRunner.query(`DROP TABLE "bible_glossary_verses"`);
    await queryRunner.query(`DROP TABLE "bible_glossary"`);
    await queryRunner.query(`DROP TABLE "bible_glossary_translation"`);
  }
}
