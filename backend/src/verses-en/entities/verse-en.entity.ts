import { Chapter } from "../../chapters/entities/chapter.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VerseEn {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @Column()
  text: string;

  @Column()
  textNormalized: string;

  @ManyToOne(() => Chapter)
  chapter: Chapter;
}
