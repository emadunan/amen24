import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorBookmarkToRelyOnChapter1746380755572
  implements MigrationInterface
{
  name = 'RefactorBookmarkToRelyOnChapter1746380755572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "FK_fbff8e22c4742ae7e1a0bf13709"`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmark_verses" ("bookmarkId" integer NOT NULL, "verseId" integer NOT NULL, CONSTRAINT "PK_5c2fd7b2ff16cd09dd4cebbe258" PRIMARY KEY ("bookmarkId", "verseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47afc232c1092dcb1cd8ec8be9" ON "bookmark_verses" ("bookmarkId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f686ebfd893cb14815bff7822" ON "bookmark_verses" ("verseId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP COLUMN "verseGroupId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "chapterId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "UQ_4edb539940a721209459ef2ac7e" UNIQUE ("profileEmail", "chapterId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "FK_a089a43336ab657cc4dff522745" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_verses" ADD CONSTRAINT "FK_47afc232c1092dcb1cd8ec8be9b" FOREIGN KEY ("bookmarkId") REFERENCES "bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_verses" ADD CONSTRAINT "FK_8f686ebfd893cb14815bff7822d" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark_verses" DROP CONSTRAINT "FK_8f686ebfd893cb14815bff7822d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_verses" DROP CONSTRAINT "FK_47afc232c1092dcb1cd8ec8be9b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "FK_a089a43336ab657cc4dff522745"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "UQ_4edb539940a721209459ef2ac7e"`,
    );
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "chapterId"`);
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "verseGroupId" integer NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8f686ebfd893cb14815bff7822"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47afc232c1092dcb1cd8ec8be9"`,
    );
    await queryRunner.query(`DROP TABLE "bookmark_verses"`);
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "FK_fbff8e22c4742ae7e1a0bf13709" FOREIGN KEY ("verseGroupId") REFERENCES "verse_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
