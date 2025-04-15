import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenToProfile1744667300641
  implements MigrationInterface
{
  name = 'AddRefreshTokenToProfile1744667300641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "refreshToken" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "refreshToken"`);
  }
}
