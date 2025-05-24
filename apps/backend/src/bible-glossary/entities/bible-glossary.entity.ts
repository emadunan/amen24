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
import { ApprovalStatus, GlossaryCategory } from '@amen24/shared';

@Unique(['slug'])
@Entity()
export class BibleGlossary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  native: string;

  @Column({ type: 'text', default: GlossaryCategory.Other })
  category: GlossaryCategory;

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

  @Column({ type: 'text', default: ApprovalStatus.Pending })
  approvalStatus: ApprovalStatus;
}
