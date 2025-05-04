import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Verse } from './verse.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Featured } from '../../featured/entities/featured.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';

@Entity()
export class VerseGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Verse)
  @JoinColumn({ name: 'startingVerseId' })
  startingVerse: Verse;

  @ManyToMany(() => Verse, (verse) => verse.verseGroups)
  @JoinTable({ name: 'verse_group_verses' })
  verses: Verse[];

  @OneToOne(() => Featured, (featured) => featured.verseGroup)
  featured: Featured;

  @OneToMany(() => Favorite, (favorite) => favorite.verseGroup)
  favorites: Favorite[];
}
