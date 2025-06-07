// library-book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LibraryChapter } from './library-chapter.entity';
import { Lang } from '@amen24/shared';
import { Denomination } from '@amen24/shared';
import { Church } from '@amen24/shared';

@Entity()
export class LibraryBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  author: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string; // e.g., Theology, Biography, Devotional

  @Column({ type: 'varchar', length: 100, nullable: true })
  denomination: Denomination; // e.g., Catholic, Orthodox, Protestant

  @Column({ type: 'varchar', length: 150, nullable: true })
  church: Church; // e.g., Coptic Orthodox Church, Assemblies of God

  @Column({ type: 'varchar', length: 20, default: 'en' })
  lang: Lang;

  @Column({ type: 'int', nullable: true })
  year: number;

  @OneToMany(() => LibraryChapter, chapter => chapter.book, { cascade: true })
  chapters: LibraryChapter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
