import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { VerseGroup } from '../../verses/entities/verse-group.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Profile, (profile) => profile.bookmarks, {
      onDelete: 'CASCADE',
      nullable: false,
    })
    @JoinColumn({ name: 'profileEmail', referencedColumnName: 'email' })
    profile: Profile;
  
    @ManyToOne(() => VerseGroup, (verseGroup) => verseGroup.bookmarks, {
      onDelete: 'CASCADE',
      nullable: false,
    })
    @JoinColumn({ name: 'verseGroupId' })
    verseGroup: VerseGroup;
}
