import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewBookmarkEntity1746344891651
  implements MigrationInterface
{
  name = 'CreateNewBookmarkEntity1746344891651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "FK_4cd4002ed01cdb4660302d912f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "UQ_dbbe441c08d730fe1a91ac17f16"`,
    );
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "verseId"`);
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "verseGroupId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "FK_fbff8e22c4742ae7e1a0bf13709" FOREIGN KEY ("verseGroupId") REFERENCES "verse_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP CONSTRAINT "FK_fbff8e22c4742ae7e1a0bf13709"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" DROP COLUMN "verseGroupId"`,
    );
    await queryRunner.query(`ALTER TABLE "bookmark" ADD "verseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "bookmark" ADD "title" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "UQ_dbbe441c08d730fe1a91ac17f16" UNIQUE ("profileEmail", "title", "verseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD CONSTRAINT "FK_4cd4002ed01cdb4660302d912f3" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
