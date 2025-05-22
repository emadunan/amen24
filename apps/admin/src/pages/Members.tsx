import React from "react";
import styles from "./Members.module.css";
import { useGetProfilesQuery } from "../store/profileApi";
import SelectPrivilege from "../components/layout/SelectPrivilege";
import PageTitle from "../components/ui/PageTitle";

const Members: React.FC = () => {
  const { data: profiles } = useGetProfilesQuery();

  return (
    <div className={styles.membersContainer}>
      <PageTitle>Members</PageTitle>
      <div className={styles.members}>
        {profiles?.map((member) => (
          <div className={styles.card} key={member.email}>
            <div className={styles.header}>
              <div>
                <strong>{member.email}</strong>
              </div>
              <div>
                <SelectPrivilege member={member} />
              </div>
            </div>

            <div className={styles.infoGrid}>
              <div><strong>Providers:</strong><br />{member.users.map((u) => `${u.provider} (${u.displayName})`).join(", ")}</div>
              <div><strong>Created:</strong><br />{new Date(member.createdAt).toLocaleDateString()}</div>
              <div><strong>Last Login:</strong><br />{member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : "—"}</div>
              <div><strong>Language:</strong><br />{member.uiLang?.toUpperCase() ?? "—"}</div>
              <div><strong>Font Size:</strong><br />{member.fontSize}</div>
              <div><strong>Theme:</strong><br />{member.themeMode}</div>
              <div><strong>Calendar:</strong><br />{member.dateCalendar}</div>
              <div><strong>Favorites:</strong><br />{member.favorites.length}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
