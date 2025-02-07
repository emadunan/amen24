import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { UserCategory } from "../../@types/user-category.enum";
import { BibleBooks } from "../../@types/bible-book.enum";

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

  @Column({ default: BibleBooks.GENESIS })
  currentBook: string;

  @Column({ default: 1 })
  currentChapter: number;

  @Column({ default: 1 })
  fontSize: number;

  @Column({ default: true })
  diacrited: boolean;

  @Column({default: false})
  darkMode: boolean;
}