import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { VerseGroup } from '../../verses/entities/verse-group.entity';

@Unique(['profile', 'verseGroup'])
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.favorites, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'profileEmail', referencedColumnName: 'email' })
  profile: Profile;

  @ManyToOne(() => VerseGroup, (verseGroup) => verseGroup.favorites, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'verseGroupId' })
  verseGroup: VerseGroup;
}
