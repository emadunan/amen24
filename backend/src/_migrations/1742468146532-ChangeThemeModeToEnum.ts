import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeThemeModeToEnum1742468146532 implements MigrationInterface {
  name = 'ChangeThemeModeToEnum1742468146532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "themeMode"`);
    await queryRunner.query(
      `CREATE TYPE "public"."profile_thememode_enum" AS ENUM('dark', 'light')`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "themeMode" "public"."profile_thememode_enum" NOT NULL DEFAULT 'light'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "themeMode"`);
    await queryRunner.query(`DROP TYPE "public"."profile_thememode_enum"`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "themeMode" character varying NOT NULL DEFAULT false`,
    );
  }
}
