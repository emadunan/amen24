import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUiLangAttribute1742548978334 implements MigrationInterface {
    name = 'RenameUiLangAttribute1742548978334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "uilang" TO "uiLang"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "uiLang" TO "uilang"`);
    }

}
