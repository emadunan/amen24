import { normalizeText } from '@amen24/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BibleGlossaryTranslation } from '../bible-glossary/entities/bible-glossary-translation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataTransformService {
  private readonly logger = new Logger(DataTransformService.name);

  constructor(
    @InjectRepository(BibleGlossaryTranslation) private bgtRepo: Repository<BibleGlossaryTranslation>,
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
}
