import React, { useEffect, useState } from 'react';
import styles from './Auditing.module.css'; // <--- css module file
import { apiUrl } from '../constants';
import { fetchWithReauth } from '@amen24/ui';

interface AuditingRecord {
  id: number;
  action: string;
  performedBy: string;
  metadata?: string;
  createdAt: string; // ISO string
}

const Auditing: React.FC = () => {
  const [records, setRecords] = useState<AuditingRecord[]>([]);

  useEffect(() => {
    async function fetchAuditingRecords() {
      try {
        const response = await fetchWithReauth(`${apiUrl}/auditing`);

        if (!response.ok) {
          throw new Error("Failed to fetch auditing records");
        }

        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAuditingRecords();
  }, [])

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Auditing Logs</h3>
      <div className={styles.list}>
        {records.map((record) => (
          <div key={record.id} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.date}>{new Date(record.createdAt).toLocaleString()}</span>
              <span className={styles.user}>{record.performedBy}</span>
            </div>
            <div className={styles.action}>
              {record.action}
            </div>
            {record.metadata && (
              <div className={styles.metadata}>
                {record.metadata}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auditing;
