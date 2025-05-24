import React, { useState } from 'react';
import styles from './GlossaryTermDesc.module.css';
import { BibleGlossaryTranslation, flagMap } from '@amen24/shared';
import { useTranslation } from 'react-i18next';
import { getDirection } from '@amen24/ui';
import { useUpdateTranslationMutation } from '../../store/glossaryApi';

interface Props {
  bgt: BibleGlossaryTranslation;
}

const GlossaryTermDesc: React.FC<Props> = ({ bgt }) => {
  const { t } = useTranslation();
  const [updateTranslation, _result] = useUpdateTranslationMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(bgt.title);
  const [desc, setDesc] = useState(bgt.description);

  const handleSave = async () => {
    setIsEditing(false);

    const payload = {
      id: bgt.id,
      title,
      description: desc,
    }

    await updateTranslation(payload).unwrap()
  };

  const handleDiscard = () => {
    setTitle(bgt.title);
    setDesc(bgt.description);
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.lang}>
        <p>{flagMap[bgt.lang]} {t(`lang:${bgt.lang}`)}</p>
      </div>

      <div className={styles.title}>
        {!isEditing ? (
          <p>{title}</p>
        ) : (
          <input
            type="text"
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        <div className={styles.actions}>
          {!isEditing ? (
            <>
              <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                Edit
              </button>
              {/* <button className={styles.deleteBtn} onClick={() => { }}>
                Delete
              </button> */}
            </>
          ) : (
            <>
              <button className={styles.saveBtn} onClick={handleSave}>
                Save
              </button>
              <button className={styles.discardBtn} onClick={handleDiscard}>
                Discard
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <div
          className={styles.desc}
          dir={getDirection(bgt.lang)}
        >
          {desc}
        </div>
      ) : (
        <textarea
          className={styles.textarea}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          dir={getDirection(bgt.lang)}
        />
      )}
    </div>
  );
};

export default GlossaryTermDesc;
