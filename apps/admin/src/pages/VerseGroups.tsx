import { useEffect, useState } from 'react';
import styles from './VerseGroups.module.css'
import { apiUrl } from '../constants';
import { VerseGroup } from '@amen24/shared';
import { fetchWithReauth } from '@amen24/ui';

const VerseGroups = () => {
  const [verseGroups, setVerseGroups] = useState<VerseGroup[]>();

  useEffect(() => {
    async function fetchVerseGroups() {
      const response = await fetchWithReauth(`${apiUrl}/verses/groups`);

      if (!response.ok) throw new Error(`Failed to fetch verse groups`);

      const data = await response.json();
      setVerseGroups(data);
    }

    fetchVerseGroups();
  }, []);

  return (
    <div>
      <h3 className={styles.title}>Verse Groups</h3>
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
  )
}

export default VerseGroups;