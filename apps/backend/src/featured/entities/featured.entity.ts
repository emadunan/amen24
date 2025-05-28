import { FeaturedPosition } from '@amen24/shared';
import { FeaturedText } from './featured-text.entity';
import { VerseGroup } from '../../verses/entities/verse-group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Featured {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VerseGroup, (verseGroup) => verseGroup.featured, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  verseGroup: VerseGroup;

  @OneToMany(() => FeaturedText, (featuredText) => featuredText.featured)
  featuredText: FeaturedText[];

  @Column({ type: 'text', default: FeaturedPosition.UNASSIGNED })
  position: FeaturedPosition;
}
