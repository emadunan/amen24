import { Chapter } from "src/chapters/entities/chapter.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Chapter, chapter => chapter.book)
  chapters: Chapter[]
}
