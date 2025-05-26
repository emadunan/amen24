import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { BibleGlossary } from './bible-glossary.entity';
import { Lang } from '@amen24/shared';

@Unique(['lang', 'glossary'])
@Entity()
export class BibleGlossaryTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  lang: Lang;

  @Column()
  term: string;

  @Column({ type: 'text', nullable: true })
  definition?: string;

  @Column({ type: 'text', nullable: true })
  oldDefinition?: string;

  @ManyToOne(() => BibleGlossary, (glossary) => glossary.translations, {
    onDelete: 'CASCADE',
  })
  glossary: BibleGlossary;
}
