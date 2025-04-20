import styles from './AppFooter.module.css'

const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Amen24. All rights reserved.</p>
    </footer>
  )
}

export default AppFooter;