import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesToProfile1746532008890 implements MigrationInterface {
  name = 'AddRolesToProfile1746532008890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "roles" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "roles"`);
  }
}
