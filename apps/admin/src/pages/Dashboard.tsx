import React from "react";
import styles from "./Dashboard.module.css";
import { useGetProfileStatisticsQuery } from "../store/userApi";

const Dashboard: React.FC = () => {

  const { data: profileStatistics } = useGetProfileStatisticsQuery();

  return (
    <div className={styles.dashboard}>
      <h3 className={styles.title}>Dashboard</h3>
      <div className={styles.grid}>
        {
          profileStatistics && (
            <section className={styles.card}>
              <h4>Users</h4>
              <div className={styles.stats}>
                <p><strong>Total:</strong> {profileStatistics.users.total}</p>
                <p><strong>Logged Today:</strong> {profileStatistics.users.loggedInToday}</p>
                <p><strong>Created Today:</strong> {profileStatistics.users.createdToday}</p>
              </div>
            </section>
          )
        }

        {/* <section className={styles.card}>
          <h4>Visitors</h4>
          <div className={styles.stats}>
            <p><strong>Total:</strong> {statistics.visitors.total}</p>
            <p><strong>Today:</strong> {statistics.visitors.today}</p>
          </div>
        </section> */}

        {
          profileStatistics && (
            <section className={styles.card}>
              <h4>UI Languages</h4>
              <div className={styles.list}>
                {Object.entries(profileStatistics.uiLang).map(([lang, count]) => (
                  <p key={lang}>
                    <strong>{lang.toUpperCase()}:</strong> {count}
                  </p>
                ))}
              </div>
            </section>
          )
        }

        {
          profileStatistics && (<section className={styles.card}>
            <h4>Theme Modes</h4>
            <div className={styles.list}>
              {Object.entries(profileStatistics.theme).map(([mode, count]) => (
                <p key={mode}>
                  <strong>{mode.charAt(0).toUpperCase() + mode.slice(1)}:</strong> {count}
                </p>
              ))}
            </div>
          </section>)
        }

        {
          profileStatistics && (<section className={styles.card}>
            <h4>Calendars</h4>
            <div className={styles.list}>
              {Object.entries(profileStatistics.calendars).map(([mode, count]) => (
                <p key={mode}>
                  <strong>{mode.charAt(0).toUpperCase() + mode.slice(1)}:</strong> {count}
                </p>
              ))}
            </div>
          </section>)
        }

        {
          profileStatistics && (
            <section className={styles.card}>
              <h4>Auth Providers</h4>
              <div className={styles.list}>
                {Object.entries(profileStatistics.providers).map(([provider, count]) => (
                  <p key={provider}>
                    <strong>{provider.charAt(0).toUpperCase() + provider.slice(1)}:</strong> {count}
                  </p>
                ))}
              </div>
            </section>
          )
        }

      </div>
    </div>
  );
};

export default Dashboard;
