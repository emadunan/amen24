"use client";

import { FC, useCallback, useRef, useState } from "react";
import styles from "./UserMenu.module.css";
import { useClickOutside, showToast } from "@amen24/ui";
import { hasPermission, Permission, User, UserRole } from "@amen24/shared";
import { RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { FaRegStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: User;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, isOpen, setIsOpen);

  const handleRedirect = (urlSegment: string) => {
    router.push(urlSegment);
    setIsOpen(false);
  };

  const handleLogout = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Logout failed");

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      showToast("error:logoutFailed", "error");
    }
  }, []);

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
          {hasPermission(user.profile.roles, Permission.MANAGE_FEATURED) && (
            <li tabIndex={0}>
              <button
                onClick={handleRedirect.bind(this, "/featured")}
                className={styles.listItem}
              >
                <HiSparkles />
                <span className={styles.listItemText}>
                  {t("userMenu.featured")}
                </span>
              </button>
            </li>
          )}
          <li tabIndex={1}>
            <button
              onClick={handleRedirect.bind(this, "/favorites")}
              className={styles.listItem}
            >
              <FaRegStar />
              <span className={styles.listItemText}>
                {t("userMenu.favorite")}
              </span>
            </button>
          </li>
          <li tabIndex={2}>
            <button
              onClick={handleRedirect.bind(this, "/settings")}
              className={styles.listItem}
            >
              <RiSettings3Line />
              <span className={styles.listItemText}>
                {t("userMenu.settings")}
              </span>
            </button>
          </li>
          <div className={styles.separator} />
          <button onClick={handleLogout} className={styles.listItem}>
            <RiLogoutBoxLine className={styles.flipIcon} />
            <span className={styles.listItemText}>{t("userMenu.logout")}</span>
          </button>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
