import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PageTitle from '../components/ui/PageTitle';
import styles from './GlossaryItem.module.css';
import { FaBackspace } from "react-icons/fa";
import { useGetOneTermQuery, useUpdateTermMutation } from '../store/glossaryApi';
import GlossaryTermDesc from '../components/glossary/GlossaryTermDesc';
import { showToast } from '@amen24/ui';
import { ApprovalStatus, GlossaryCategory } from '@amen24/shared';

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
      updateTerm({ slug: term.slug, native: trimmedValue, approvalStatus: ApprovalStatus.Pending });
    }
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.titleHeader}>
          <NavLink to={"/glossary"}>
            <FaBackspace className={styles.backLink} />
          </NavLink>

          <PageTitle className={styles.absoluteTitle}>/{slug?.toUpperCase()}</PageTitle>
        </div>

        <div className={styles.termHeader}>
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
            <h3 onClick={() => setIsEditing(true)}>
              {nativeValue}
            </h3>
          )}

          <select
            className={styles.selectCategory}
            value={term?.category || ''}
            onChange={async (e) => {
              const category = e.target.value;
              if (term && category !== term.category) {
                await updateTerm({ slug: term.slug, category: category as GlossaryCategory, approvalStatus: ApprovalStatus.Pending }).unwrap();
              }
            }}
          >
            {Object.entries(GlossaryCategory).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div>
        {term?.translations.map(bgt => (
          <GlossaryTermDesc key={bgt.lang} slug={term.slug} bgt={bgt} />
        ))}
      </div>
    </div>
  );
};

export default GlossaryItem;