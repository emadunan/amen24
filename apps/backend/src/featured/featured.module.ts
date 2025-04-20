import { Module } from '@nestjs/common';
import { FeaturedService } from './featured.service';
import { FeaturedController } from './featured.controller';
import { VersesModule } from 'src/verses/verses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Featured } from './entities/featured.entity';
import { FeaturedText } from './entities/featured-text.entity';

@Module({
  imports: [VersesModule, TypeOrmModule.forFeature([Featured, FeaturedText])],
  controllers: [FeaturedController],
  providers: [FeaturedService],
})
export class FeaturedModule {}
