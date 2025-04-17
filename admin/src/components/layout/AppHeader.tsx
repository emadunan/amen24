import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.appTitle}>
        <h2>Amen24</h2>
        <h3>AdminSite</h3>
      </div>
      <nav>
        {true && (<ul className={styles.navbar}>
          <li className={styles.listItem} ><NavLink to={`/`}>Dashboard</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/members`}>Members</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/verse-groups`}>Verse Groups</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/featured`}>Featured</NavLink></li>
          <li className={styles.listItem} ><NavLink to={`/glossary`}>Glossary</NavLink></li>
          <button className={styles.logoutButton}>Logout</button>
        </ul>)}
      </nav>
    </header>
  )
}

export default AppHeader