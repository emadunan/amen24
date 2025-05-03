import { Verse } from '../../verses/entities/verse.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
@Unique(['profile', 'verse', 'title'])
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @ManyToOne(() => Profile, (profile) => profile.progresses, {
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
