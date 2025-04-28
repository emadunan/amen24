import React from "react";
import styles from "./Members.module.css";
import { useGetProfilesQuery } from "../store/userApi";

const Members: React.FC = () => {
  const { data: profiles } = useGetProfilesQuery();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Members</h3>

      <div className={styles.scrollWrapper}>
        <div className={styles.scrollArea}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th >Email</th>
                <th>Providers</th>
                <th>Privilege</th>
                <th>Created</th>
                <th>Last Login</th>
                <th>Lang</th>
                <th>Font</th>
                <th>Theme</th>
                <th>Calendar</th>
                <th>Fav</th>
              </tr>
            </thead>
            <tbody>
              {profiles && (
                profiles.map((member) => (
                  <tr key={member.email}>
                    <td >{member.email}</td>
                    <td>{member.users.map((user) => <p key={user.id}>{user.provider} &ndash; {user.displayName}</p>)}</td>
                    <td>
                      <span className={styles.badge}>{member.privilege}</span>
                    </td>
                    <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                    <td>{member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : "—"}</td>
                    <td>{member.uiLang?.toUpperCase() ?? "—"}</td>
                    <td>{member.fontSize}</td>
                    <td>{member.themeMode}</td>
                    <td>{member.dateCalendar}</td>
                    <td>{member.favorites.length}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;
