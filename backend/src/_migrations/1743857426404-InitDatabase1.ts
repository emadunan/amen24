import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase11743857426404 implements MigrationInterface {
  name = 'InitDatabase11743857426404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verse_translation" DROP CONSTRAINT "FK_e5078846f8fbbe8b533d48fce6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ALTER COLUMN "verseId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ADD CONSTRAINT "FK_e5078846f8fbbe8b533d48fce6c" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verse_translation" DROP CONSTRAINT "FK_e5078846f8fbbe8b533d48fce6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ALTER COLUMN "verseId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "verse_translation" ADD CONSTRAINT "FK_e5078846f8fbbe8b533d48fce6c" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
