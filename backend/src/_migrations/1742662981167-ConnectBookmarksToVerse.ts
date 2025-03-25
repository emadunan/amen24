import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConnectBookmarksToVerse1742662981167
  implements MigrationInterface
{
  name = 'ConnectBookmarksToVerse1742662981167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "FK_7cf2d66bf254d52dcef78841c4d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dbf9c339ebf18b8078346a475b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "verseNo" smallint NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3a7c43442ff02196e331e51e74" ON "bookmark" ("profileEmail", "bookKey", "chapterNo", "verseNo") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3a7c43442ff02196e331e51e74"`,
    );
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "verseNo"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_dbf9c339ebf18b8078346a475b" ON "bookmark" ("profileEmail", "bookKey", "chapterNo") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "FK_7cf2d66bf254d52dcef78841c4d" FOREIGN KEY ("bookKey", "chapterNo") REFERENCES "chapter"("bookKey","chapterNo") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
