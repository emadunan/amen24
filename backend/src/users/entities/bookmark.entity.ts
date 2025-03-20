import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { BookKey } from '@amen24/shared';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Profile, (profile) => profile.bookmarks)
  @Index()
  profile: Profile;

  @Column({ type: "enum", enum: BookKey })
  bookKey: BookKey;

  @Column()
  chapterNum: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
