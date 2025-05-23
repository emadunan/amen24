import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PageTitle from '../components/ui/PageTitle';
import styles from './GlossaryItem.module.css';
import { FaBackspace } from "react-icons/fa";
import { useGetOneTermQuery } from '../store/glossaryApi';
import GlossaryTermDesc from '../components/glossary/GlossaryTermDesc';

const GlossaryItem: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: term } = useGetOneTermQuery(slug || '');

  return (
    <div>
      <header className={styles.pageHeader}>
        <NavLink to={"/glossary"}>
          <FaBackspace className={styles.backLink} />
        </NavLink>

        <PageTitle className={styles.title}>/{slug?.toUpperCase()}</PageTitle>
      </header>
      <div>
        {term?.translations.map(bgt => <GlossaryTermDesc bgt={bgt}/>)}
      </div>
    </div>
  )
}

export default GlossaryItem;