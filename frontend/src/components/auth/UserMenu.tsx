"use client";

import { FC, useRef, useState } from "react";
import styles from "./UserMenu.module.css";
import { UserProfile } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line, RiStarLine } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";
import { useGetMeQuery, useLogoutMutation } from "@/store/users";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user?: UserProfile;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(dropdownRef, isOpen, setIsOpen);

  const [mutate] = useLogoutMutation();

  async function handleLogout() {
    await mutate().unwrap();
    router.replace("/");
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
          {user?.displayName.split(" ").at(0)}
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
          <button className={`${styles.logoutBtn} ${styles.listItem}`} onClick={handleLogout}>
            <RiLogoutBoxLine className={styles.flipIcon} />
            <span className={styles.listItemText}>{t("logout")}</span>
          </button>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;