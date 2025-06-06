import { FC } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { hasPermission, Permission, User } from "@amen24/shared";

interface Props {
  user: User;
  handleLogout: () => Promise<void>;
}

const NavBar: FC<Props> = ({ user, handleLogout }) => {
  return (
    <ul className={styles.navList}>
      {hasPermission(user.profile.roles, Permission.READ_DASHBOARD) && (
        <li className={styles.listItem}>
          <NavLink to={`/`}>Dashboard</NavLink>
        </li>
      )}

      {hasPermission(user.profile.roles, Permission.READ_MEMBERS) && (
        <li className={styles.listItem}>
          <NavLink to={`/members`}>Members</NavLink>
        </li>
      )}

      {hasPermission(user.profile.roles, Permission.READ_AUDITING) && (
        <li className={styles.listItem}>
          <NavLink to={`/auditing`}>Auditing</NavLink>
        </li>
      )}

      {hasPermission(user.profile.roles, Permission.MANAGE_VERSE_GROUPS) && (
        <li className={styles.listItem}>
          <NavLink to={`/verse-groups`}>Groups</NavLink>
        </li>
      )}

      {hasPermission(user.profile.roles, Permission.MANAGE_FEATURED) && (
        <li className={styles.listItem}>
          <NavLink to={`/featured`}>Featured</NavLink>
        </li>
      )}

      {hasPermission(user.profile.roles, Permission.UPDATE_GLOSSARY_TERM) && (
        <li className={styles.listItem}>
          <NavLink to={`/glossary`}>Glossary</NavLink>
        </li>
      )}

      <LogoutBtn onLogout={handleLogout} />
    </ul>
  );
};

export default NavBar;
