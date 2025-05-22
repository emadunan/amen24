import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveBookmarksToProgress1746271855477
  implements MigrationInterface
{
  name = 'MoveBookmarksToProgress1746271855477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "progress" ("id" SERIAL NOT NULL, "title" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileEmail" text NOT NULL, "verseId" integer, CONSTRAINT "UQ_709afd204c291001380fe80a82d" UNIQUE ("profileEmail", "verseId", "title"), CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auditing" ALTER COLUMN "performedBy" SET DEFAULT 'visitor'`,
    );
    await queryRunner.query(`ALTER TABLE "auditing" DROP COLUMN "metadata"`);
    await queryRunner.query(`ALTER TABLE "auditing" ADD "metadata" text`);
    await queryRunner.query(
      `ALTER TABLE "progress" ADD CONSTRAINT "FK_cb0109bb5f0e7bd0c5e0f78b2c2" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" ADD CONSTRAINT "FK_7a344afe6679d9d9a99961baf9b" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "progress" DROP CONSTRAINT "FK_7a344afe6679d9d9a99961baf9b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" DROP CONSTRAINT "FK_cb0109bb5f0e7bd0c5e0f78b2c2"`,
    );
    await queryRunner.query(`ALTER TABLE "auditing" DROP COLUMN "metadata"`);
    await queryRunner.query(`ALTER TABLE "auditing" ADD "metadata" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "auditing" ALTER COLUMN "performedBy" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP TABLE "progress"`);
  }
}
