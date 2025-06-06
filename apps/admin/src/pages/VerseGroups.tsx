import React from "react";
import styles from "./VerseGroups.module.css";

import { useGetVerseGroupsQuery } from "../store/verseApi";

const VerseGroups: React.FC = () => {
  const { data: verseGroups } = useGetVerseGroupsQuery();

  return (
    <div>
      <div>
        {verseGroups?.map((vg) => (
          <div key={vg.id} className={styles.verseGroupCard}>
            <div className={styles.header}>
              <span className={styles.groupId}>Group #{vg.id}</span>
              <span className={styles.createdAt}>
                {new Date(vg.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.verseList}>
              <strong>Verses:</strong>
              <ul>
                {vg.verses?.map((verse) => (
                  <li key={verse.id}>Verse #{verse.id}</li>
                ))}
              </ul>
            </div>

            {vg.startingVerse && (
              <div className={styles.startingVerse}>
                <strong>Starting Verse ID:</strong> {vg.startingVerse.id}
              </div>
            )}

            <div className={styles.metaInfo}>
              <span className={styles.favoriteCount}>
                ❤️ {vg.favorites?.length ?? 0} favorites
              </span>

              {vg.featured && (
                <span className={styles.featuredTag}>🌟 Featured</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerseGroups;
