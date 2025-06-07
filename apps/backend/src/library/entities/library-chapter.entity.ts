// library-chapter.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LibraryBook } from './library-book.entity';

@Entity()
export class LibraryChapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  order: number; // Chapter number

  @Column({ type: 'text' })
  content: string; // Raw or HTML-formatted text

  @Column({ type: 'text' })
  normalizedContent: string; // Raw or HTML-formatted text
  
  @ManyToOne(() => LibraryBook, book => book.chapters, { onDelete: 'CASCADE' })
  book: LibraryBook;
}
