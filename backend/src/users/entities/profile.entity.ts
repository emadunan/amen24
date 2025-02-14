import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCategory, BibleBook, Language } from '@amen24/shared';
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

  @Column({ default: BibleBook.GENESIS })
  currentBook: BibleBook;

  @Column({ default: 1 })
  currentChapter: number;

  @Column({ nullable: true })
  uilanguage: Language;

  @Column({ default: 1 })
  fontSize: number;

  @Column({ default: true })
  diacrited: boolean;

  @Column({ default: false })
  darkMode: boolean;
}
