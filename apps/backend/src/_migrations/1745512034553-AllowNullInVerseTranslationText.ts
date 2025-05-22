import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowNullInVerseTranslationText1745512034553
  implements MigrationInterface
{
  name = 'AllowNullInVerseTranslationText1745512034553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ALTER COLUMN "text" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ALTER COLUMN "textNormalized" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ALTER COLUMN "textNormalized" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ALTER COLUMN "text" SET NOT NULL`,
    );
  }
}
