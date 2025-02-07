import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserCategory, BibleBook, Language } from "../../@types";
import { User } from "./user.entity";


@Entity()
export class Profile {
  @PrimaryColumn()
  email: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @Column({ default: UserCategory.MEMBER })
  privilege: UserCategory;

  @Column({ nullable: true })
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