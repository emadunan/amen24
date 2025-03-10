import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCategory, BookKey, Lang, ThemeMode } from '@amen24/shared';
import { User } from './user.entity';

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

  @Column({ default: BookKey.GENESIS })
  currentBook: BookKey;

  @Column({ default: 1 })
  currentChapter: number;

  @Column({ nullable: true })
  uilang: Lang;

  @Column({ default: 1 })
  fontSize: number;

  @Column({ default: false })
  themeMode: ThemeMode;

  @Column({ default: true })
  isDiacritized: boolean;
}
