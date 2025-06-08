import React from 'react';
import styles from './LibraryBookList.module.css';
import LibraryBookCard from './LibraryBookCard';

export const dummyBooks = [
  {
    id: '1',
    title: "The Pilgrim's Progress",
    author: 'John Bunyan',
    category: 'Devotional',
    coverImageTitle: "The Pilgrim's Progress",
  },
  {
    id: '2',
    title: 'Systematic Theology',
    author: 'Wayne Grudem',
    category: 'Biblical Studies',
    coverImageTitle: 'Systematic Theology',
  },
  {
    id: '3',
    title: 'Church History in Plain Language',
    author: 'Bruce Shelley',
    category: 'Church History',
    coverImageTitle: 'Church History in Plain Language',
  },
  {
    id: '4',
    title: 'Commentary on Romans',
    author: 'Martin Luther',
    category: 'Commentaries',
    coverImageTitle: 'Commentary on Romans',
  },
  {
    id: '5',
    title: 'The Purpose Driven Life',
    author: 'Rick Warren',
    category: 'Devotional',
    coverImageTitle: 'The Purpose Driven Life',
  },
  {
    id: '6',
    title: 'Mere Christianity',
    author: 'C.S. Lewis',
    category: 'Biblical Studies',
    coverImageTitle: 'Mere Christianity',
  },
  {
    id: '7',
    title: 'The Orthodox Way',
    author: 'Kallistos Ware',
    category: 'Theology',
    coverImageTitle: 'The Orthodox Way',
  },
  {
    id: '8',
    title: 'Knowing God',
    author: 'J.I. Packer',
    category: 'Theology',
    coverImageTitle: 'Knowing God',
  },
  {
    id: '9',
    title: 'The Case for Christ',
    author: 'Lee Strobel',
    category: 'Apologetics',
    coverImageTitle: 'The Case for Christ',
  },
  {
    id: '10',
    title: 'Desiring God',
    author: 'John Piper',
    category: 'Devotional',
    coverImageTitle: 'Desiring God',
  },
];


interface Book {
  id: string;
  title: string;
  author?: string;
  category?: string;
  coverImageTitle: string;
}

interface BookCardListProps {
  books: Book[];
  onBookClick?: (bookId: string) => void;
}

const LibraryBookList: React.FC<BookCardListProps> = ({ books, onBookClick }) => {
  return (
    <div className={styles.grid}>
      {dummyBooks.map(book => (
        <LibraryBookCard
          key={book.id}
          title={book.title}
          author={book.author}
          category={book.category}
          coverImageTitle={book.coverImageTitle}
          onClick={() => onBookClick && onBookClick(book.id)}
        />
      ))}
    </div>
  );
};

export default LibraryBookList;
