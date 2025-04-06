import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Verse } from './verse.entity';
import { Favorite } from '../../users/entities/favorite.entity';

@Entity()
export class VerseGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.verseGroup, {
    nullable: true,
  })
  favorites: Favorite[];

  @ManyToMany(() => Verse, (verse) => verse.verseGroups)
  @JoinTable({ name: 'verse_group_verses' })
  verses: Verse[];
}
