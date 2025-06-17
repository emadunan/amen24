import { Module } from '@nestjs/common';
import { DataTransformService } from './data-transform.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleGlossaryTranslation } from '../bible-glossary/entities/bible-glossary-translation.entity';
import { ConfigModule } from '@nestjs/config';
import joiConfig from '../_config/joi.config';
import { TypeOrmConfigService } from '../_config/database.config';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joiConfig,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([BibleGlossaryTranslation, Book])
  ],
  providers: [DataTransformService],
})
export class DataTransformModule { }
