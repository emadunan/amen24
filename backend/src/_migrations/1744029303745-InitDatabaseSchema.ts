import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabaseSchema1744029303745 implements MigrationInterface {
    name = 'InitDatabaseSchema1744029303745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "bookKey" character varying NOT NULL, CONSTRAINT "UQ_7a8de40b0468ea207173269b602" UNIQUE ("bookKey"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "num" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "UQ_131dafdff12114e749eb1b4a2be" UNIQUE ("bookId", "num"), CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text, "displayName" character varying NOT NULL, "provider" text NOT NULL DEFAULT 'local', "providerId" text, "photoUri" text, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "failedAttempts" smallint NOT NULL DEFAULT '0', "lockUntil" TIMESTAMP WITH TIME ZONE, "resetPasswordToken" text, "resetPasswordExpires" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "title" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileEmail" text NOT NULL, "verseId" integer, CONSTRAINT "UQ_dbbe441c08d730fe1a91ac17f16" UNIQUE ("profileEmail", "verseId", "title"), CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("email" text NOT NULL, "privilege" text NOT NULL DEFAULT 'member', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP WITH TIME ZONE DEFAULT now(), "uiLang" text, "fontSize" smallint NOT NULL DEFAULT '1', "themeMode" text NOT NULL DEFAULT 'light', "dateCalendar" text NOT NULL DEFAULT 'gregorian', "isDiacritized" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3825121222d5c17741373d8ad13" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "profileEmail" text NOT NULL, "verseGroupId" integer, CONSTRAINT "UQ_d0bd95dd49ce11856904f737fb9" UNIQUE ("profileEmail", "verseGroupId"), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verse_group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ef2c6122160cd45ad4aa874900f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verse_translation" ("id" SERIAL NOT NULL, "lang" text NOT NULL, "text" text NOT NULL, "textNormalized" text NOT NULL, "textDiacritized" text, "verseId" integer NOT NULL, CONSTRAINT "PK_c3b7119a1f36c274175162ff963" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_lang" ON "verse_translation" ("lang") `);
        await queryRunner.query(`CREATE TABLE "verse" ("id" SERIAL NOT NULL, "num" smallint NOT NULL, "chapterId" integer NOT NULL, CONSTRAINT "UQ_52e58631a3eea5d5b68a441fdbe" UNIQUE ("chapterId", "num"), CONSTRAINT "PK_1bf192a2ee81fa999f9a75939e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verse_group_verses" ("verseGroupId" integer NOT NULL, "verseId" integer NOT NULL, CONSTRAINT "PK_6caba3ca05db54ba77591934915" PRIMARY KEY ("verseGroupId", "verseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff4e636cb21d32506b31b34f46" ON "verse_group_verses" ("verseGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd30f79b6d672ab688c635a89e" ON "verse_group_verses" ("verseId") `);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22" FOREIGN KEY ("email") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_1d0085d0d2f724fa5fe0e1d39d1" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_4cd4002ed01cdb4660302d912f3" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_4ac9701e06098ad724c34f80a1d" FOREIGN KEY ("profileEmail") REFERENCES "profile"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_4280ca834f31e51ddc59343bb32" FOREIGN KEY ("verseGroupId") REFERENCES "verse_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verse_translation" ADD CONSTRAINT "FK_e5078846f8fbbe8b533d48fce6c" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verse" ADD CONSTRAINT "FK_5784019838c4e9808ba55d81f82" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verse_group_verses" ADD CONSTRAINT "FK_ff4e636cb21d32506b31b34f46f" FOREIGN KEY ("verseGroupId") REFERENCES "verse_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "verse_group_verses" ADD CONSTRAINT "FK_cd30f79b6d672ab688c635a89ec" FOREIGN KEY ("verseId") REFERENCES "verse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verse_group_verses" DROP CONSTRAINT "FK_cd30f79b6d672ab688c635a89ec"`);
        await queryRunner.query(`ALTER TABLE "verse_group_verses" DROP CONSTRAINT "FK_ff4e636cb21d32506b31b34f46f"`);
        await queryRunner.query(`ALTER TABLE "verse" DROP CONSTRAINT "FK_5784019838c4e9808ba55d81f82"`);
        await queryRunner.query(`ALTER TABLE "verse_translation" DROP CONSTRAINT "FK_e5078846f8fbbe8b533d48fce6c"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_4280ca834f31e51ddc59343bb32"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_4ac9701e06098ad724c34f80a1d"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_4cd4002ed01cdb4660302d912f3"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_1d0085d0d2f724fa5fe0e1d39d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd30f79b6d672ab688c635a89e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff4e636cb21d32506b31b34f46"`);
        await queryRunner.query(`DROP TABLE "verse_group_verses"`);
        await queryRunner.query(`DROP TABLE "verse"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_lang"`);
        await queryRunner.query(`DROP TABLE "verse_translation"`);
        await queryRunner.query(`DROP TABLE "verse_group"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
