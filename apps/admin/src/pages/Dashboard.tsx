import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

interface ProfileStatistics {
  users: {
    total: number,
    loggedInToday: number,
    createdToday: number,
  },
  uiLang: {
    en: number,
    fr: number,
    ar: number,
  },
  theme: {
    light: number,
    dark: number,
  },
  providers: {
    local: number,
    google: number,
    facebook: number,
  }
}

const Dashboard: React.FC = () => {
  const [profileStatistics, setProfileStatistics] = useState<ProfileStatistics | null>(null);

  const statistics = {
    users: {
      total: 1200,
      loggedInToday: 150,
      createdToday: 20,
    },
    uiLang: {
      en: 800,
      fr: 250,
      ar: 150,
    },
    theme: {
      light: 900,
      dark: 300,
    },
    providers: {
      local: 1000,
      google: 150,
      facebook: 50,
    },
    visitors: {
      today: "-", // Placeholder for now
      total: "-",
    },
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/profile/statistics", {
          credentials: "include"
        });

        if (!response.ok) throw new Error("Failed to fetch profile statistics data.")

        const data = await response.json();

        setProfileStatistics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatistics();
  }, []);

  if (!profileStatistics) return <span>Loading ...</span>;

  return (
    <div className={styles.dashboard}>
      <h3 className={styles.title}>Dashboard</h3>
      <div className={styles.grid}>
        <section className={styles.card}>
          <h4>Users</h4>
          <div className={styles.stats}>
            <p><strong>Total:</strong> {profileStatistics.users.total}</p>
            <p><strong>Logged Today:</strong> {profileStatistics.users.loggedInToday}</p>
            <p><strong>Created Today:</strong> {profileStatistics.users.createdToday}</p>
          </div>
        </section>

        <section className={styles.card}>
          <h4>Visitors</h4>
          <div className={styles.stats}>
            <p><strong>Total:</strong> {statistics.visitors.total}</p>
            <p><strong>Today:</strong> {statistics.visitors.today}</p>
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
          <h4>Auth Providers</h4>
          <div className={styles.list}>
            {Object.entries(profileStatistics.providers).map(([provider, count]) => (
              <p key={provider}>
                <strong>{provider.charAt(0).toUpperCase() + provider.slice(1)}:</strong> {count}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
