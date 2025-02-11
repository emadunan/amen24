import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProfileAddLang1738957997674 implements MigrationInterface {
  name = 'AlterProfileAddLang1738957997674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "uilanguage" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "uilanguage"`);
  }
}
