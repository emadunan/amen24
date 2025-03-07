"use client";

import { FC, useCallback, useRef, useState } from "react";
import styles from "./UserMenu.module.css";
import { UserProfile } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line, RiStarLine } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";
import { userApi, useLogoutMutation } from "@/store/users";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


interface UserMenuProps {
  user?: UserProfile;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useClickOutside(dropdownRef, isOpen, setIsOpen);

  const [mutate] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await mutate().unwrap();

      dispatch(userApi.util.resetApiState());
      setIsOpen(false); // Close menu after logout
      router.refresh(); // Ensure user state updates
      router.replace("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [mutate, router]);
  

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