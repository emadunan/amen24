"use client";

import { FC, useRef, useState } from "react";
import styles from "./UserMenu.module.css";
import { UserProfile } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line, RiStarLine } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";
import { useGetMeQuery } from "@/store/users";

interface UserMenuProps {
  user?: UserProfile;
}

const UserMenu: FC<UserMenuProps> = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, isOpen, setIsOpen);

  const { data: user, isLoading, error } = useGetMeQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user</p>;

  async function handleLogout() {
    await fetch("http://localhost:5000/auth/logout", { method: "post" });
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={styles.buttonText}>
          {user!.displayName.split(" ").at(0)}
        </span>
        <PiUserListFill size={22} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          <li className={styles.listItem} tabIndex={0}>
            <RiStarLine />
            <span className={styles.listItemText}>{t("favorite")}</span>
          </li>
          <li className={styles.listItem} tabIndex={0}>
            <RiSettings3Line />
            <span className={styles.listItemText}>{t("settings")}</span>
          </li>
          <div className={styles.separator} />
          <button className={`${styles.logoutBtn} ${styles.listItem}`}>
            <RiLogoutBoxLine className={styles.flipIcon} />
            <span className={styles.listItemText}>{t("logout")}</span>
          </button>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;