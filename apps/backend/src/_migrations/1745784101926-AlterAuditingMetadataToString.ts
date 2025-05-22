import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAuditingMetadataToString1745784101926
  implements MigrationInterface
{
  name = 'AlterAuditingMetadataToString1745784101926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auditing" DROP COLUMN "metadata"`);
    await queryRunner.query(`ALTER TABLE "auditing" ADD "metadata" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auditing" DROP COLUMN "metadata"`);
    await queryRunner.query(`ALTER TABLE "auditing" ADD "metadata" jsonb`);
  }
}
