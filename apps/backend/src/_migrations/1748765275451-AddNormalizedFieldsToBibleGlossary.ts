import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNormalizedFieldsToBibleGlossary1748765275451 implements MigrationInterface {
    name = 'AddNormalizedFieldsToBibleGlossary1748765275451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" ADD "termNormalized" character varying`);
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" ADD "definitionNormalized" text`);
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" ADD "oldDefinitionNormalized" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" DROP COLUMN "oldDefinitionNormalized"`);
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" DROP COLUMN "definitionNormalized"`);
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" DROP COLUMN "termNormalized"`);
    }

}
