import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNativeAttrToGlossary1748005088585 implements MigrationInterface {
    name = 'AddNativeAttrToGlossary1748005088585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary" ADD "native" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary" DROP COLUMN "native"`);
    }

}
