import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPositionAttrToFeatured1748433238837 implements MigrationInterface {
    name = 'AddPositionAttrToFeatured1748433238837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "featured" ADD "position" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "featured" DROP COLUMN "position"`);
    }

}
