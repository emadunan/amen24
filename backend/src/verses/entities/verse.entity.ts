import { Chapter } from '../../chapters/entities/chapter.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { VerseGroup } from './verse-group.entity';
import { VerseTranslation } from './verse-translation.entity';

@Unique(['chapter', 'num'])
@Entity()
export class Verse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  num: number;

  @ManyToOne(() => Chapter, (chapter) => chapter.verses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  chapter: Chapter;

  @ManyToMany(() => VerseGroup, (verseGroup) => verseGroup.verses)
  verseGroups: VerseGroup[];

  @OneToMany(
    () => VerseTranslation,
    (verseTranslation) => verseTranslation.verse,
  )
  verseTranslations: VerseTranslation[];
}
