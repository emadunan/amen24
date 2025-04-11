import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lang, ThemeMode, DateCalendar, UserPrivilege } from '@amen24/shared';
import { User } from './user.entity';
import { Bookmark } from './bookmark.entity';
import { Favorite } from './favorite.entity';

@Entity()
export class Profile {
  @PrimaryColumn({ type: 'text' })
  email: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @Column({ type: 'text', default: UserPrivilege.MEMBER })
  privilege: UserPrivilege;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Column({ type: 'text', nullable: true })
  uiLang: Lang | null;

  @Column({ type: 'smallint', default: 1 })
  fontSize: number;

  @Column({ type: 'text', default: ThemeMode.LIGHT })
  themeMode: ThemeMode;

  @Column({ type: 'text', default: DateCalendar.GREGORIAN })
  dateCalendar: DateCalendar;

  @Column({ type: 'boolean', default: true })
  isDiacritized: boolean;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.profile, {
    cascade: true,
    eager: true,
  })
  bookmarks: Bookmark[];

  @OneToMany(() => Favorite, (favorite) => favorite.profile)
  favorites: Favorite[];
}
