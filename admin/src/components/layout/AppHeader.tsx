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
        <ul className={styles.navbar}>
          <li><NavLink to={`/`}>Dashboard</NavLink></li>
          <li><NavLink to={`/members`}>Members</NavLink></li>
          <li><NavLink to={`/verse-groups`}>Verse Groups</NavLink></li>
          <li><NavLink to={`/featured`}>Featured</NavLink></li>
          <li><NavLink to={`/glossary`}>Glossary</NavLink></li>
          <li><NavLink to={`/`}>Logout</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader