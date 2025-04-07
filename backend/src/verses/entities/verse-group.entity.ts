import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Verse } from './verse.entity';
import { Favorite } from '../../users/entities/favorite.entity';

@Entity()
export class VerseGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Verse)
  @JoinColumn({ name: 'startingVerseId' })
  startingVerse: Verse;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.verseGroup)
  favorites: Favorite[];

  @ManyToMany(() => Verse, (verse) => verse.verseGroups)
  @JoinTable({ name: 'verse_group_verses' })
  verses: Verse[];
}
