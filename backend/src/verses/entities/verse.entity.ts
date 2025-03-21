import { Lang, BookKey } from '@amen24/shared';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Verse {
  @PrimaryColumn({ type: 'text' })
  bookKey: BookKey;

  @PrimaryColumn({ type: 'smallint' })
  chapterNo: number;

  @PrimaryColumn({ type: 'smallint' })
  verseNo: number;

  @PrimaryColumn({ type: 'text' })
  lang: Lang;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'text' })
  textNormalized: string;

  @Column({ type: 'text', nullable: true })
  textDiacritized?: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.verses, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn([
    { name: 'bookKey', referencedColumnName: 'bookKey' },
    { name: 'chapterNo', referencedColumnName: 'chapterNo' },
  ])
  chapter: Chapter;
}
