import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowNullInGrossaryTransDesc1747922570019 implements MigrationInterface {
    name = 'AllowNullInGrossaryTransDesc1747922570019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary_translation" ALTER COLUMN "description" SET NOT NULL`);
    }

}
