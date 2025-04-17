import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { useGetMeQuery } from '../../store/authApi';
import { UserPrivilege } from '@amen24/shared';
import { useCallback } from 'react';
import { apiUrl } from '../../constants';

const AppHeader = () => {
  const { data: user } = useGetMeQuery();

  const handleLogout = useCallback(async () => {
    try {
      const res = await fetch(
        `${apiUrl}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Logout failed");

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.appTitle}>
        <h2>Amen24</h2>
        <h3>AdminSite</h3>
      </div>
      <nav>
        {user?.profile.privilege === UserPrivilege.ADMIN && (<ul className={styles.navbar}>
          <li className={styles.listItem} ><NavLink to={`/`}>Dashboard</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/members`}>Members</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/verse-groups`}>Verse Groups</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/featured`}>Featured</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/glossary`}>Glossary</NavLink></li>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </ul>)}
      </nav>
    </header>
  )
}

export default AppHeader