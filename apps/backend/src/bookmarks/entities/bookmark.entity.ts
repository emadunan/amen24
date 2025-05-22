import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Verse } from '../../verses/entities/verse.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';

@Unique(['profile', 'chapter'])
@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.bookmarks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'profileEmail', referencedColumnName: 'email' })
  profile: Profile;

  @ManyToOne(() => Chapter, { nullable: false })
  @JoinColumn({ name: 'chapterId' })
  chapter: Chapter;

  @ManyToMany(() => Verse)
  @JoinTable({ name: 'bookmark_verses' })
  verses: Verse[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
