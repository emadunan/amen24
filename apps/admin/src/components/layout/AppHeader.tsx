import styles from './AppHeader.module.css';
import { useGetMeQuery } from '../../store/authApi';
import { hasPermission, Permission } from '@amen24/shared';
import { useCallback } from 'react';
import { apiUrl } from '../../constants';
import NavBar from './NavBar';
import NavMenu from './NavMenu';
import { useBreakpoint } from '@amen24/ui';

const AppHeader = () => {
  const { data: user } = useGetMeQuery();
  const { isTablet } = useBreakpoint();

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
      {
        user?.profile?.roles.length ? (
          <nav>
            {hasPermission(user.profile.roles, Permission.LOGIN_ADMINSITE) ? (
              isTablet
                ? <NavMenu handleLogout={handleLogout} user={user}/>
                : <NavBar handleLogout={handleLogout} user={user}/>
            ) : null}
          </nav>
        ) : "loading ..."
      }

    </header>
  )
}

export default AppHeader