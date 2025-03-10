import { Chapter } from '../../chapters/entities/chapter.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookKey } from '@amen24/shared';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: BookKey })
  title: BookKey;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];
}
