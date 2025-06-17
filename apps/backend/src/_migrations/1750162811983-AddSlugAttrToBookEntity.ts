import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugAttrToBookEntity1750162811983 implements MigrationInterface {
    name = 'AddSlugAttrToBookEntity1750162811983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "slug" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "slug"`);
    }

}
