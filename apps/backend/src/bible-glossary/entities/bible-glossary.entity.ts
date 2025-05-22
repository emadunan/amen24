import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Unique,
} from 'typeorm';
import { Verse } from '../../verses/entities/verse.entity';
import { BibleGlossaryTranslation } from './bible-glossary-translation.entity';

@Unique(['slug'])
@Entity()
export class BibleGlossary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @ManyToMany(() => Verse, (verse) => verse.glossaryTerms)
  @JoinTable({
    name: 'bible_glossary_verses',
    joinColumn: { name: 'glossaryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'verseId', referencedColumnName: 'id' },
  })
  verses: Verse[];

  @OneToMany(() => BibleGlossaryTranslation, (t) => t.glossary, {
    cascade: true,
    eager: true,
  })
  translations: BibleGlossaryTranslation[];
}
