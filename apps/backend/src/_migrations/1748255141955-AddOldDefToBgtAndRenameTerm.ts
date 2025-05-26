import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOldDefToBgtAndRenameTerm1748255141955
  implements MigrationInterface
{
  name = 'AddOldDefToBgtAndRenameTerm1748255141955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" ADD "term" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" ADD "definition" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" ADD "oldDefinition" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" DROP COLUMN "oldDefinition"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" DROP COLUMN "definition"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" DROP COLUMN "term"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" ADD "description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "bible_glossary_translation" ADD "title" character varying NOT NULL`,
    );
  }
}
