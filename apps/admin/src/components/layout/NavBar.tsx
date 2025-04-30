import { FC } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

interface Props {
  handleLogout: () => Promise<void>
}

const NavBar: FC<Props> = ({ handleLogout }) => {
  return (
    <ul className={styles.navList}>
      <li className={styles.listItem} >
        <NavLink to={`/`}>Dashboard</NavLink>
      </li>
      <li className={styles.listItem} >
        <NavLink to={`/members`}>Members</NavLink>
      </li>
      <li className={styles.listItem} >
        <NavLink to={`/auditing`}>Auditing</NavLink>
      </li>
      <li className={styles.listItem} >
        <NavLink to={`/verse-groups`}>Groups</NavLink>
      </li>
      <li className={styles.listItem} >
        <NavLink to={`/featured`}>Featured</NavLink>
      </li>
      {/* <li className={styles.listItem} >
        <NavLink to={`/glossary`}>Glossary</NavLink>
      </li>
      <li className={styles.listItem} >
        <NavLink to={`/blogs`}>Blogs</NavLink>
      </li>
      <li className={styles.listItem} >
        <NavLink to={`/library`}>Library</NavLink>
      </li> */}
      <LogoutBtn onLogout={handleLogout}/>
    </ul>
  );
};

export default NavBar;
