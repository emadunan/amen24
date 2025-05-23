import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PageTitle from '../components/ui/PageTitle';
import styles from './GlossaryItem.module.css';
import { FaBackspace } from "react-icons/fa";

const GlossaryItem: React.FC = () => {
  const params = useParams();

  return (
    <div>
      <header className={styles.pageHeader}>
        <NavLink to={"/glossary"}><FaBackspace className={styles.backLink}/></NavLink>
        <PageTitle className={styles.title}>/{params.slug?.toUpperCase()}</PageTitle>
      </header>
    </div>
  )
}

export default GlossaryItem;