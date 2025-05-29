import React from 'react';
import { Featured, Lang } from '@amen24/shared';
import styles from './FeaturedParagraph.module.css'
import VerseBlockReferenceLink from '../bible/VerseBlockReferenceLink';

interface Props {
  lang: Lang;
  featured?: Featured;
}

const FeaturedParagraph: React.FC<Props> = ({ lang, featured }) => {
  if (!featured) return <></>;

  return (
    <div>
      <p className={styles.featuredText}>
        {featured.featuredText.at(0)?.text}
      </p>

      <VerseBlockReferenceLink featured={featured} lang={lang} />
    </div>
  )
}

export default FeaturedParagraph