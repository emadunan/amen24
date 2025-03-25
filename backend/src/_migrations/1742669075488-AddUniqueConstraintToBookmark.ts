import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToBookmark1742669075488
  implements MigrationInterface
{
  name = 'AddUniqueConstraintToBookmark1742669075488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3a7c43442ff02196e331e51e74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "UQ_25bda2872542e8be1a6211d8683" UNIQUE ("profileEmail", "bookKey", "chapterNo", "verseNo", "title")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "UQ_25bda2872542e8be1a6211d8683"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3a7c43442ff02196e331e51e74" ON "bookmark" ("profileEmail", "bookKey", "chapterNo", "verseNo") `,
    );
  }
}
