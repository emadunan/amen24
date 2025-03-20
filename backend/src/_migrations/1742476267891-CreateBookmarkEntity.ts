import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookmarkEntity1742476267891 implements MigrationInterface {
    name = 'CreateBookmarkEntity1742476267891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookmark_bookkey_enum" AS ENUM('GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SOL', 'ISA', 'JER', 'LAM', 'EZE', 'DAN', 'HOS', 'JOE', 'AMO', 'OBA', 'JON', 'MIC', 'NAH', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL', 'MAT', 'MAR', 'LUK', 'JOH', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHI', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAM', '1PE', '2PE', '1JO', '2JO', '3JO', 'JUD', 'REV')`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "bookKey" "public"."bookmark_bookkey_enum" NOT NULL, "chapterNum" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileEmail" character varying, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d0085d0d2f724fa5fe0e1d39d" ON "bookmark" ("profileEmail") `);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "currentBook"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "currentChapter"`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_1d0085d0d2f724fa5fe0e1d39d1" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_1d0085d0d2f724fa5fe0e1d39d1"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "currentChapter" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "currentBook" character varying NOT NULL DEFAULT 'GEN'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d0085d0d2f724fa5fe0e1d39d"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TYPE "public"."bookmark_bookkey_enum"`);
    }

}
