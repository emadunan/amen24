import { Chapter } from '../../chapters/entities/chapter.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { VerseGroup } from './verse-group.entity';

@Unique(['verseNum', 'chapter'])
@Entity()
export class Verse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  verseNum: number;

  @ManyToOne(() => Chapter, (chapter) => chapter.verses, { nullable: false, onDelete: "CASCADE" })
  chapter: Chapter;

  @OneToMany(() => VerseGroup, verseGroup => verseGroup.verses)
  verseGroup: VerseGroup;
}
