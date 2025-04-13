"use client";

import { FC, useCallback, useRef, useState } from "react";
import styles from "./UserMenu.module.css";
import { User, UserPrivilege } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";
import { userApi, useLogoutMutation } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { showToast } from "@/utils/toast";
import { FaRegStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

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

  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();

      dispatch(userApi.util.resetApiState());
      setIsOpen(false); // Close menu after logout

      router.refresh(); // Refresh user state
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      showToast("error:logoutFailed", "error");
    }
  }, [logout, router]);

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
          {user?.profile.privilege === UserPrivilege.ADMIN && (
            <li tabIndex={0}>
              <Link href="/featured" className={styles.listItem}>
                <HiSparkles />
                <span className={styles.listItemText}>
                  {t("userMenu.featured")}
                </span>
              </Link>
            </li>
          )}
          <li tabIndex={1}>
            <Link href="/favorites" className={styles.listItem}>
              <FaRegStar />
              <span className={styles.listItemText}>
                {t("userMenu.favorite")}
              </span>
            </Link>
          </li>
          <li tabIndex={2}>
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
