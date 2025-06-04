import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useGetProfileStatisticsQuery } from "../store/profileApi";
import { apiUrl } from "../constants";

interface DashboardData {
  visits: number;
  searchCount: number;
  bibleAccessCount: number;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { data: profileStatistics } = useGetProfileStatisticsQuery();

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch(`${apiUrl}/dashboard`);
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const data = await response.json();
      setDashboardData(data);
    }

    if (profileStatistics) {
      fetchDashboardData();
    }
  }, [profileStatistics]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.grid}>
        {
          dashboardData && (
            <section className={styles.card}>
              <h4>Visitor Activity</h4>
              <div className={styles.stats}>
                <p><strong>Visits:</strong> {dashboardData.visits}</p>
                <p><strong>Searches:</strong> {dashboardData.searchCount}</p>
                <p><strong>Bible Access:</strong> {dashboardData.bibleAccessCount}</p>
              </div>
            </section>
          )
        }

        {
          profileStatistics && (
            <>
              <section className={styles.card}>
                <h4>Users</h4>
                <div className={styles.stats}>
                  <p><strong>Total:</strong> {profileStatistics.users.total}</p>
                  <p><strong>Logged Today:</strong> {profileStatistics.users.loggedInToday}</p>
                  <p><strong>Created Today:</strong> {profileStatistics.users.createdToday}</p>
                </div>
              </section>

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

              <section className={styles.card}>
                <h4>Theme Modes</h4>
                <div className={styles.list}>
                  {Object.entries(profileStatistics.theme).map(([mode, count]) => (
                    <p key={mode}>
                      <strong>{mode.charAt(0).toUpperCase() + mode.slice(1)}:</strong> {count}
                    </p>
                  ))}
                </div>
              </section>

              <section className={styles.card}>
                <h4>Calendars</h4>
                <div className={styles.list}>
                  {Object.entries(profileStatistics.calendars).map(([mode, count]) => (
                    <p key={mode}>
                      <strong>{mode.charAt(0).toUpperCase() + mode.slice(1)}:</strong> {count}
                    </p>
                  ))}
                </div>
              </section>

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
            </>
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;
