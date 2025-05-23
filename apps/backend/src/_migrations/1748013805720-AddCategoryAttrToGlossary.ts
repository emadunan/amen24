import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryAttrToGlossary1748013805720 implements MigrationInterface {
    name = 'AddCategoryAttrToGlossary1748013805720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary" ADD "category" text NOT NULL DEFAULT 'other'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary" DROP COLUMN "category"`);
    }

}
