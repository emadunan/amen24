import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from './profile.entity';
import { VerseGroup } from '../../verses/entities/verse-group.entity';

@Unique(['profile', 'verseGroup'])
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.favorites)
  profile: Profile;

  @ManyToOne(() => VerseGroup, (verseGroup) => verseGroup.favorites)
  verseGroup: VerseGroup;
}
