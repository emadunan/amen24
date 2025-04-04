import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Verse } from './verse.entity';
import { Favorite } from '../../users/entities/favorite.entity';

@Entity()
export class VerseGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Favorite, favorite => favorite.verseGroup, { nullable: true })
  favorites: Favorite[];

  @OneToMany(() => Verse, verse => verse.verseGroup)
  verses: Verse[];
}
