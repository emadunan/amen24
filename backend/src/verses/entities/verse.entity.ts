import { Lang } from '@amen24/shared';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @Column()
  text: string;

  @Column()
  textNormalized: string;

  @Column({ type: 'enum', enum: Lang })
  lang: Lang;

  @ManyToOne(() => Chapter, (chapter) => chapter.verses, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter;
}
