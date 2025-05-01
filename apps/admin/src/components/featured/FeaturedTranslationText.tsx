import { FeaturedText, Lang } from '@amen24/shared';
import { FC, useEffect, useState } from 'react';
import styles from './FeaturedTranslationText.module.css';
import { useUpdateFeaturedTextMutation } from '../../store/featuredApi';

interface Props {
  featuredTextItem: FeaturedText;
}

const FeaturedTranslationText: FC<Props> = ({ featuredTextItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(featuredTextItem.text);
  const [updateText] = useUpdateFeaturedTextMutation();

  useEffect(() => {
    setText(featuredTextItem.text);
  }, [featuredTextItem.text]);

  const handleSave = () => {
    setIsEditing(false);
    updateText({ id: featuredTextItem.id, text })
  };

  const handleDiscard = () => {
    setText(featuredTextItem.text);
    setIsEditing(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.lang}>{featuredTextItem.lang}</span>
        <div className={styles.buttonGroup}>
          {!isEditing ? (
            <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
              Edit
            </button>
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
        <p
          className={styles.text}
          dir={featuredTextItem.lang === Lang.ARABIC ? 'rtl' : 'ltr'}
        >
          {text}
        </p>
      ) : (
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir={featuredTextItem.lang === Lang.ARABIC ? 'rtl' : 'ltr'}
        />
      )}
    </div>
  );
};

export default FeaturedTranslationText;
