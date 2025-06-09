import React from 'react';
import { useParams } from 'react-router-dom';

const LibraryBook: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  return (
    <div>
      <h3>{slug}</h3>
    </div>
  )
}

export default LibraryBook