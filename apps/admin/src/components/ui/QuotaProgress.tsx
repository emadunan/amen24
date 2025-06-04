import { FC } from 'react';
import styles from './QuotaProgress.module.css';
import { useGetProviderQuotaQuery } from '../../store/quotaTrackerApi';

interface Props {
  provider: string;
}

const QuotaProgress: FC<Props> = ({ provider }) => {
  const { data, isLoading } = useGetProviderQuotaQuery(provider);

  console.log(data);
  

  if (isLoading || !data) return <p>Loading ...</p>

  const { value, max } = data;

  const percentage = Math.min((value / max) * 100, 100);
  const isDanger = percentage >= 90;

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span className={styles.provider}>{provider} quota used: </span>
        <span>{value} / {max}</span>
      </div>
      <div className={styles.bar}>
        <div
          className={`${styles.fill} ${isDanger ? styles.danger : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default QuotaProgress;
