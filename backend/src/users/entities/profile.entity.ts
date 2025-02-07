import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
  @PrimaryColumn()
  email: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @Column({ default: 'client' })
  privilege: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ default: "genesis" })
  currentBook: string;

  @Column({ default: 1 })
  currentChapter: number;

  @Column({ default: true })
  diacrited: boolean;

  @Column({ default: 1 })
  fontSize: number;
}