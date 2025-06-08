import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLibraryBookEntities1749321184648 implements MigrationInterface {
    name = 'AddLibraryBookEntities1749321184648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "library_book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "author" character varying(255), "description" text, "category" character varying(100), "denomination" character varying(100), "church" character varying(150), "lang" character varying(20) NOT NULL DEFAULT 'en', "year" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6d1c6783237fc5912ca886cf8d8" UNIQUE ("slug"), CONSTRAINT "PK_49d9035ea8ba398acb83a01bd99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "library_chapter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "order" integer NOT NULL, "content" text NOT NULL, "normalizedContent" text NOT NULL, "bookId" uuid, CONSTRAINT "PK_d2d5bfed7b3e1d6baf528e24645" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "library_chapter" ADD CONSTRAINT "FK_cd6fc2916917598c4fbc70b8005" FOREIGN KEY ("bookId") REFERENCES "library_book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "library_chapter" DROP CONSTRAINT "FK_cd6fc2916917598c4fbc70b8005"`);
        await queryRunner.query(`DROP TABLE "library_chapter"`);
        await queryRunner.query(`DROP TABLE "library_book"`);
    }

}
