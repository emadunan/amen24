"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./UserProfileDropdown.module.css";
import { UserProfile } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line, RiStarLine } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";

interface UserProfileProps {
  user: UserProfile;
}

export default function UserProfileDropdown({ user }: UserProfileProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await fetch("http://localhost:5000/auth/logout", { method: "post" });
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.buttonText}>
          {user.displayName.split(" ").at(0)}
        </span>
        <PiUserListFill size={22} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          <li className={styles.listItem}>
            <RiStarLine />
            <span className={styles.listItemText}>{t('favorite')}</span>

          </li>
          <li className={styles.listItem}>
            <RiSettings3Line />
            <span className={styles.listItemText}>{t('settings')}</span>
          </li>
          <li className={styles.listItem}>
            <RiLogoutBoxLine className={styles.flipIcon} />
            <span className={styles.listItemText}>{t('logout')}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
