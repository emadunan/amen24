import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChapterAndVerseEnTbl1739484762432 implements MigrationInterface {
    name = 'CreateChapterAndVerseEnTbl1739484762432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" RENAME COLUMN "bookKey" TO "title"`);
        await queryRunner.query(`CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "num" integer NOT NULL, "bookId" integer, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verse_en" ("id" SERIAL NOT NULL, "num" integer NOT NULL, "text" character varying NOT NULL, "textNormalized" character varying NOT NULL, "chapterId" integer, CONSTRAINT "PK_c84bbd9c9dbd911ac61ef0297e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verse_en" ADD CONSTRAINT "FK_6e3ff7d1bbfbecf49ebdae587c0" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verse_en" DROP CONSTRAINT "FK_6e3ff7d1bbfbecf49ebdae587c0"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0"`);
        await queryRunner.query(`DROP TABLE "verse_en"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`ALTER TABLE "book" RENAME COLUMN "title" TO "bookKey"`);
    }

}
