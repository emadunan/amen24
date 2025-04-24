import { Lang } from '@amen24/shared';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Verse } from './verse.entity';

@Index('IDX_lang', ['lang'])
@Entity()
export class VerseTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  lang: Lang;

  @Column({ type: 'text', nullable: true })
  text?: string;

  @Column({ type: 'text', nullable: true })
  textNormalized?: string;

  @Column({ type: 'text', nullable: true })
  textDiacritized?: string;

  @ManyToOne(() => Verse, (verse) => verse.verseTranslations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'verseId' })
  verse: Verse;
}
