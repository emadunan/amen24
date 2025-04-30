import styles from "./NavMenu.module.css";
import { FC, useState } from "react";
import { MenuButton } from "@amen24/ui";
import { NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

interface Props {
  handleLogout: () => Promise<void>
}

const NavMenu: FC<Props> = ({ handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.navMenu}>
      {/* Menu Button */}
      <MenuButton
        isOpen={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* Slide-in Menu */}
      <nav className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to='/'
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/members"
              onClick={() => setMenuOpen(false)}
            >
              Members
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/auditing"
              onClick={() => setMenuOpen(false)}
            >
              Auditing
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/verse-groups"
              onClick={() => setMenuOpen(false)}
            >
              Groups
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/featured"
              onClick={() => setMenuOpen(false)}
            >
              Featured
            </NavLink>
          </li>
          {/* <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/glossary"
              onClick={() => setMenuOpen(false)}
            >
              Glossary
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/blogs"
              onClick={() => setMenuOpen(false)}
            >
              Blogs
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={styles.link}
              to="/library"
              onClick={() => setMenuOpen(false)}
            >
              Library
            </NavLink>
          </li> */}
          <LogoutBtn onLogout={handleLogout} />
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
