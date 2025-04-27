import React from "react";
import styles from "./Members.module.css";

const members = [
  {
    email: "john@example.com",
    providers: ["google", "local"],
    privilege: "MEMBER",
    createdAt: "2023-04-01T12:00:00Z",
    lastLogin: "2025-04-24T14:30:00Z",
    uiLang: "en",
    fontSize: 1,
    themeMode: "light",
    dateCalendar: "gregorian",
    isDiacritized: true,
    favoritesCount: 12,
  },
  // ...more members
];

const Members = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Members</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Providers</th>
              <th>Privilege</th>
              <th>Created</th>
              <th>Last Login</th>
              <th>Lang</th>
              <th>Font Size</th>
              <th>Theme</th>
              <th>Calendar</th>
              <th>Diacritized</th>
              <th>Favorites</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.email}>
                <td>{member.email}</td>
                <td>{member.providers.join(", ")}</td>
                <td>
                  <span className={styles.badge}>{member.privilege}</span>
                </td>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                <td>{member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : "—"}</td>
                <td>{member.uiLang?.toUpperCase() ?? "—"}</td>
                <td>{member.fontSize}</td>
                <td>{member.themeMode}</td>
                <td>{member.dateCalendar}</td>
                <td>{member.isDiacritized ? "Yes" : "No"}</td>
                <td>{member.favoritesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
