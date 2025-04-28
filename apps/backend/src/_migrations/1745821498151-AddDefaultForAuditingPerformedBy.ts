import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultForAuditingPerformedBy1745821498151 implements MigrationInterface {
    name = 'AddDefaultForAuditingPerformedBy1745821498151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auditing" ALTER COLUMN "performedBy" SET DEFAULT 'visitor'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auditing" ALTER COLUMN "performedBy" DROP DEFAULT`);
    }

}
