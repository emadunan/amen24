import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PageTitle from '../components/ui/PageTitle';
import styles from './GlossaryItem.module.css';
import { FaBackspace } from "react-icons/fa";
import { useGetOneTermQuery, useUpdateTermMutation } from '../store/glossaryApi';
import GlossaryTermDesc from '../components/glossary/GlossaryTermDesc';
import { showToast } from '@amen24/ui';

const GlossaryItem: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: term } = useGetOneTermQuery(slug || '');
  const [updateTerm, _result] = useUpdateTermMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [nativeValue, setNativeValue] = useState(term?.native || '');

  React.useEffect(() => {
    if (term?.native) {
      setNativeValue(term.native);
    }
  }, [term?.native]);

  function handleBlurOrEnter(e: React.KeyboardEvent | React.FocusEvent) {
    if (
      ('key' in e && e.key === 'Enter') ||
      ('type' in e && e.type === 'blur')
    ) {
      setIsEditing(false);

      if (!term) {
        showToast("Invalid term value, update failed!")
        return;
      }

      const trimmedValue = nativeValue.trim();
      if (term.native === trimmedValue) return;
      updateTerm({ slug: term.slug, native: trimmedValue });
    }
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <NavLink to={"/glossary"}>
          <FaBackspace className={styles.backLink} />
        </NavLink>

        <PageTitle className={styles.absoluteTitle}>/{slug?.toUpperCase()}</PageTitle>

        {isEditing ? (
          <input
            value={nativeValue}
            onChange={(e) => setNativeValue(e.target.value)}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleBlurOrEnter}
            autoFocus
            className={styles.editableInput}
          />
        ) : (
          <h3 onDoubleClick={() => setIsEditing(true)}>
            {nativeValue}
          </h3>
        )}
      </header>

      <div>
        {term?.translations.map(bgt => (
          <GlossaryTermDesc key={bgt.lang} bgt={bgt} />
        ))}
      </div>
    </div>
  );
};

export default GlossaryItem;