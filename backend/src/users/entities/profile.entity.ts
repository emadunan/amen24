import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCategory, Lang, ThemeMode } from '@amen24/shared';
import { User } from './user.entity';
import { Bookmark } from './bookmark.entity';

@Entity()
export class Profile {
  @PrimaryColumn()
  email: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @Column({ default: UserCategory.MEMBER })
  privilege: UserCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastLogin: Date;

  @Column({ nullable: true })
  uilang: Lang;

  @Column({ default: 1 })
  fontSize: number;

  @Column({ type: 'enum', enum: ThemeMode, default: ThemeMode.LIGHT })
  themeMode: ThemeMode;

  @Column({ default: true })
  isDiacritized: boolean;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.profile, {
    cascade: true,
    eager: true,
  })
  bookmarks: Bookmark[];
}
