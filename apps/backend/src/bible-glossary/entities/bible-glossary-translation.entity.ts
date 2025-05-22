import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { BibleGlossary } from './bible-glossary.entity';
import { Lang } from '@amen24/shared'; // Assuming you have a Lang enum

@Unique(['lang', 'glossary'])
@Entity()
export class BibleGlossaryTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  lang: Lang;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => BibleGlossary, (glossary) => glossary.translations, {
    onDelete: 'CASCADE',
  })
  glossary: BibleGlossary;
}
