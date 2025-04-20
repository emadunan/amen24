import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFeaturedEntity1744492980936 implements MigrationInterface {
  name = 'AddFeaturedEntity1744492980936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "featured_text" ("id" SERIAL NOT NULL, "lang" text NOT NULL, "text" text NOT NULL, "featuredId" integer, CONSTRAINT "PK_9b0dc2da511d2060e7944116dc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "featured" ("id" SERIAL NOT NULL, "verseGroupId" integer, CONSTRAINT "REL_33c398983436086c6a2d23d2d4" UNIQUE ("verseGroupId"), CONSTRAINT "PK_6c3a85bc24ce379add6ba1fe801" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "featured_text" ADD CONSTRAINT "FK_b8d37bfa9604a388179feb45fc8" FOREIGN KEY ("featuredId") REFERENCES "featured"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "featured" ADD CONSTRAINT "FK_33c398983436086c6a2d23d2d4b" FOREIGN KEY ("verseGroupId") REFERENCES "verse_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "featured" DROP CONSTRAINT "FK_33c398983436086c6a2d23d2d4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "featured_text" DROP CONSTRAINT "FK_b8d37bfa9604a388179feb45fc8"`,
    );
    await queryRunner.query(`DROP TABLE "featured"`);
    await queryRunner.query(`DROP TABLE "featured_text"`);
  }
}
