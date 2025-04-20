import { Outlet } from 'react-router-dom';
import styles from './AppMain.module.css';


const AppMain = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  )
}

export default AppMain