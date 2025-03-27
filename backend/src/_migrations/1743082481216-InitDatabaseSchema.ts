import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabaseSchema1743082481216 implements MigrationInterface {
    name = 'InitDatabaseSchema1743082481216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("bookKey" text NOT NULL, CONSTRAINT "PK_7a8de40b0468ea207173269b602" PRIMARY KEY ("bookKey"))`);
        await queryRunner.query(`CREATE TABLE "chapter" ("bookKey" text NOT NULL, "chapterNo" smallint NOT NULL, CONSTRAINT "PK_580ba44241152be0e4e0fbdb43c" PRIMARY KEY ("bookKey", "chapterNo"))`);
        await queryRunner.query(`CREATE TABLE "verse" ("bookKey" text NOT NULL, "chapterNo" smallint NOT NULL, "verseNo" smallint NOT NULL, "lang" text NOT NULL, "text" text NOT NULL, "textNormalized" text NOT NULL, "textDiacritized" text, "textSearch" tsvector, CONSTRAINT "PK_da1ff4113c3fe9906c370a4f989" PRIMARY KEY ("bookKey", "chapterNo", "verseNo", "lang"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f578a6688a92f59cef4870f07c" ON "verse" ("textSearch") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text, "displayName" character varying NOT NULL, "provider" text NOT NULL DEFAULT 'local', "providerId" text, "photoUri" text, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "failedAttempts" smallint NOT NULL DEFAULT '0', "lockUntil" TIMESTAMP WITH TIME ZONE, "resetPasswordToken" text, "resetPasswordExpires" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "title" text NOT NULL, "profileEmail" text NOT NULL, "bookKey" text NOT NULL, "chapterNo" smallint NOT NULL, "verseNo" smallint NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_25bda2872542e8be1a6211d8683" UNIQUE ("profileEmail", "bookKey", "chapterNo", "verseNo", "title"), CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("email" text NOT NULL, "privilege" text NOT NULL DEFAULT 'member', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP WITH TIME ZONE DEFAULT now(), "uiLang" text NOT NULL, "fontSize" smallint NOT NULL DEFAULT '1', "themeMode" text NOT NULL DEFAULT 'light', "dateCalendar" text NOT NULL DEFAULT 'gregorian', "isDiacritized" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3825121222d5c17741373d8ad13" PRIMARY KEY ("email"))`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_eb087342f35e1b9f439917158b7" FOREIGN KEY ("bookKey") REFERENCES "book"("bookKey") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verse" ADD CONSTRAINT "FK_7358c67e57572b0dc0a95fe74e6" FOREIGN KEY ("bookKey", "chapterNo") REFERENCES "chapter"("bookKey","chapterNo") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22" FOREIGN KEY ("email") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_1d0085d0d2f724fa5fe0e1d39d1" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_1d0085d0d2f724fa5fe0e1d39d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "verse" DROP CONSTRAINT "FK_7358c67e57572b0dc0a95fe74e6"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_eb087342f35e1b9f439917158b7"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f578a6688a92f59cef4870f07c"`);
        await queryRunner.query(`DROP TABLE "verse"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
