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
          <li>Dashboard</li>
          <li>Members</li>
          <li>Verse Groups</li>
          <li>Featured</li>
          <li>Terms</li>
          <li>Logout</li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader