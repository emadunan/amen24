import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApprovalStatusToGlossary1748115292669 implements MigrationInterface {
    name = 'AddApprovalStatusToGlossary1748115292669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary" ADD "approvalStatus" text NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bible_glossary" DROP COLUMN "approvalStatus"`);
    }

}
