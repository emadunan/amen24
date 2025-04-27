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
import joiConfig from './_config/joi.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiConfig,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
