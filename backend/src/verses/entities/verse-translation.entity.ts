import { Lang } from '@amen24/shared';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Verse } from './verse.entity';

@Index("IDX_lang", ["lang"])
@Entity()
export class VerseTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  lang: Lang;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'text' })
  textNormalized: string;

  @Column({ type: 'text', nullable: true })
  textDiacritized?: string;

  @ManyToOne(() => Verse, (verse) => verse)
  verse: Verse;
}
