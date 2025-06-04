import React from 'react';
import styles from './Auditing.module.css';
import { useGetAuditingRecordsQuery } from '../store/auditingApi';

const Auditing: React.FC = () => {
  const { data: records } = useGetAuditingRecordsQuery();
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {records?.map((record) => (
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
