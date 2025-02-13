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
import { VersesEnModule } from './verses-en/verses-en.module';
import joiConfig from './_config/joi.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiConfig,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UsersModule,
    BooksModule,
    ChaptersModule,
    VersesEnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
