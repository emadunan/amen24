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
import joiConfig from './_config/joi.config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiConfig,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: "support@amen24.org",
          pass: "emadunan"
        }
      }
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    ChaptersModule,
    VersesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
