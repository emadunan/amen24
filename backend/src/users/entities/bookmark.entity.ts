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
import { Verse } from '../../verses/entities/verse.entity';

@Entity()
@Unique(['profile', 'verse', 'title'])
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @ManyToOne(() => Profile, (profile) => profile.bookmarks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'profileEmail', referencedColumnName: 'email' })
  profile: Profile;

  @ManyToOne(() => Verse, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'verseId' })
  verse: Verse;

  @UpdateDateColumn()
  updatedAt: Date;
}
