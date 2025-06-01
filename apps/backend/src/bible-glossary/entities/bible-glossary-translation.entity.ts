import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BibleGlossary } from './bible-glossary.entity';
import { Lang, normalizeText } from '@amen24/shared';

@Unique(['lang', 'glossary'])
@Entity()
export class BibleGlossaryTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  lang: Lang;

  @Column()
  term: string;

  @Column({ nullable: true })
  termNormalized?: string;

  @Column({ type: 'text', nullable: true })
  definition?: string;

  @Column({ type: 'text', nullable: true })
  definitionNormalized?: string | null;

  @Column({ type: 'text', nullable: true })
  oldDefinition?: string;

  @Column({ type: 'text', nullable: true })
  oldDefinitionNormalized?: string | null;

  @ManyToOne(() => BibleGlossary, (glossary) => glossary.translations, {
    onDelete: 'CASCADE',
  })
  glossary: BibleGlossary;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeFields() {
    this.termNormalized = normalizeText(this.term, this.lang);
    this.definitionNormalized = this.definition ? normalizeText(this.definition, this.lang) : null;
    this.oldDefinitionNormalized = this.oldDefinition ? normalizeText(this.oldDefinition, this.lang) : null;
  }
}
