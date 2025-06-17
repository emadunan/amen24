import { BookKey, BookMap, normalizeText } from '@amen24/shared';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BibleGlossaryTranslation } from '../bible-glossary/entities/bible-glossary-translation.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class DataTransformService {
  private readonly logger = new Logger(DataTransformService.name);

  constructor(
    @InjectRepository(BibleGlossaryTranslation) private bgtRepo: Repository<BibleGlossaryTranslation>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) { }

  async normalizeGlossaryTranslations(): Promise<void> {
    const all = await this.bgtRepo.find();
    this.logger.log(`🔍 Found ${all.length} records to normalize.`);

    for (const row of all) {
      row.termNormalized = normalizeText(row.term, row.lang);
      row.definitionNormalized = row.definition ? normalizeText(row.definition, row.lang) : null;
      row.oldDefinitionNormalized = row.oldDefinition ? normalizeText(row.oldDefinition, row.lang) : null;

      await this.bgtRepo.save(row);
    }

    this.logger.log('✅ Normalization complete!');
  }

  async createBibleBookSlug(): Promise<void> {
    const books = Object.entries(BookMap);

    for (const [key, { slug }] of books) {
      const book = await this.bookRepo.findOneBy({ bookKey: key as BookKey });

      if (!book) throw new NotFoundException();
      book.slug = slug;

      await this.bookRepo.save(book);
    }
  }
}
