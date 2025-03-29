"use client";

import { FC, useCallback, useRef, useState } from "react";
import styles from "./UserMenu.module.css";
import { User } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";
import { MdLockReset } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";
import { userApi, useLogoutMutation } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";

interface UserMenuProps {
  user?: User;
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

      router.refresh(); // Refresh user state
      router.replace("/login"); // ✅ Redirect to login after logout
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
          {user?.displayName.split(" ").at(0)?.substring(0, 6)}
        </span>
        <PiUserListFill size={22} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          {/* <li className={styles.listItem} tabIndex={0}>
            <RiStarLine />
            <span className={styles.listItemText}>{t("userMenu.favorite")}</span>
          </li> */}
          <li tabIndex={0}>
            <Link href="/password-reset" className={styles.listItem}>
              <MdLockReset />
              <span className={styles.listItemText}>
                {t("signin.password")}
              </span>
            </Link>
          </li>
          <li tabIndex={0}>
            <Link href="/settings" className={styles.listItem}>
              <RiSettings3Line />
              <span className={styles.listItemText}>
                {t("userMenu.settings")}
              </span>
            </Link>
          </li>
          <div className={styles.separator} />
          <button
            className={`${styles.logoutBtn} ${styles.listItem}`}
            onClick={handleLogout}
          >
            <RiLogoutBoxLine className={styles.flipIcon} />
            <span className={styles.listItemText}>{t("userMenu.logout")}</span>
          </button>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
