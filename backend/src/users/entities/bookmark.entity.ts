import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Profile } from './profile.entity';
import { BookKey } from '@amen24/shared';

@Entity()
@Unique(['profileEmail', 'bookKey', 'chapterNo', 'verseNo', 'title'])
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  profileEmail: string;

  @ManyToOne(() => Profile, (profile) => profile.bookmarks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'profileEmail', referencedColumnName: 'email' })
  profile: Profile;

  @Column({ type: 'text' })
  bookKey: BookKey;

  @Column({ type: 'smallint' })
  chapterNo: number;

  @Column({ type: 'smallint' })
  verseNo: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
