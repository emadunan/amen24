import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lang, ThemeMode, DateCalendar, UserPrivilege } from '@amen24/shared';
import { User } from '../../users/entities/user.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';

@Entity()
export class Profile {
  @PrimaryColumn({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

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

  @OneToMany(() => Favorite, (favorite) => favorite.profile)
  favorites: Favorite[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.profile)
  bookmarks: Bookmark[];

  @OneToMany(() => Progress, (progress) => progress.profile, {
    cascade: true,
    eager: true,
  })
  progresses: Progress[];
}
