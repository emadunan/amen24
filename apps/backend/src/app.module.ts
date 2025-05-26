import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './_config/database.config';
import { BooksModule } from './books/books.module';
import { ChaptersModule } from './chapters/chapters.module';
import { VersesModule } from './verses/verses.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { FeaturedModule } from './featured/featured.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuditingModule } from './auditing/auditing.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProfilesModule } from './profiles/profiles.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ProgressModule } from './progress/progress.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { SysLogsModule } from './sys-logs/sys-logs.module';
import { BibleGlossaryModule } from './bible-glossary/bible-glossary.module';
import { LibreTranslateModule } from './libre-translate/libre-translate.module';
import joiConfig from './_config/joi.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiConfig,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: {
          user: 'marinaessam@amen24.org',
          pass: 'marinaEssam24!',
        },
      },
      defaults: {
        from: '"Support Team" <support@amen24.org>',
      },
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    ChaptersModule,
    VersesModule,
    FeaturedModule,
    DashboardModule,
    AuditingModule,
    ProfilesModule,
    FavoritesModule,
    ProgressModule,
    BookmarksModule,
    SysLogsModule,
    BibleGlossaryModule,
    LibreTranslateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
