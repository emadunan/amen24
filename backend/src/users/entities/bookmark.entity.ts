import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { BookKey } from '@amen24/shared';
import { Chapter } from '../../chapters/entities/chapter.entity';

@Entity()
@Index(['profileEmail', 'bookKey', 'chapterNo'], { unique: true }) // Ensures a user can't bookmark the same chapter twice
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  profileEmail: string; // Store email directly for better indexing

  @ManyToOne(() => Profile, (profile) => profile.bookmarks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'profileEmail', referencedColumnName: 'email' })
  profile: Profile;

  @Column({ type: 'text' })
  bookKey: BookKey; // Composite FK part 1

  @Column({ type: 'smallint' })
  chapterNo: number; // Composite FK part 2

  @ManyToOne(() => Chapter, (chapter) => chapter.bookmarks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn([
    { name: 'bookKey', referencedColumnName: 'bookKey' },
    { name: 'chapterNo', referencedColumnName: 'chapterNo' },
  ])
  chapter: Chapter;

  @UpdateDateColumn()
  updatedAt: Date;
}
