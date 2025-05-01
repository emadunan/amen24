"use client";

import React from "react";
import styles from "./ProfileSettings.module.css";
import { useTranslation } from "react-i18next";
import { useGetMeQuery } from "@/store/apis/authApi";
import { useDeleteAccountMutation } from "@/store/apis/userApi";
import Link from "next/link";
import { MdLockReset } from "react-icons/md";
import { useFeedback } from "@amen24/ui";

// const FONT_SIZES = ["Small", "Medium", "Large"];

const ProfileSettings = () => {
  // const [selectedFontSize, setSelectedFontSize] = useState("Medium");
  // const [isDiacritized, setIsDiacritized] = useState(false);
  const { t } = useTranslation();

  const { showApiError, showMessage } = useFeedback(t);
  const [deleteAccount] = useDeleteAccountMutation();

  async function handleDeleteAccount() {
    try {
      const { message } = await deleteAccount().unwrap();
      showMessage(message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      showApiError(error);
    }
  }

  const { data: user } = useGetMeQuery();

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>{t("profileSettings.title")}</h2>

      {/* Email Display */}
      <div className={styles.profileSection}>
        <label className={styles.label}>{t("profileSettings.email")}</label>
        <div className={styles.email}>{user?.email}</div>
      </div>

      {/* Connected Accounts */}
      {/* <div className={styles.profileSection}>
        <label className={styles.label}>{t("profileSettings.connectedAccounts")}</label>
        <ul className={styles.accountList}>
          <li className={styles.accountItem}>
            Google <button className={styles.deleteBtn}>✖</button>
          </li>
          <li className={styles.accountItem}>
            Facebook <button className={styles.deleteBtn}>✖</button>
          </li>
        </ul>
      </div> */}

      {/* Font Size Selector */}
      {/* <div className={styles.profileSection}>
        <label className={styles.label}>{t("profileSettings.fontSize")}</label>
        <div className={styles.fontSizeGroup}>
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              className={`${styles.fontSizeButton} ${selectedFontSize === size ? styles.active : ""
                }`}
              onClick={() => setSelectedFontSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div> */}

      {/* Diacritization Toggle */}
      {/* <div className={styles.profileSection}>
        <label className={styles.label}>{t("profileSettings.diacritizedText")}</label>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isDiacritized}
            onChange={() => setIsDiacritized((prev) => !prev)}
          />
          <span className={styles.sliderRound}></span>
        </label>
      </div> */}
      <div className={styles.resetSection}>
        <Link href="/password-reset" className={styles.resetLink}>
          <MdLockReset className={styles.resetIcon} />
          {t("signin.resetPassword")}
        </Link>
      </div>

      {/* Delete Account */}
      <div className={styles.deleteSection}>
        <button
          className={styles.deleteAccountBtn}
          onClick={handleDeleteAccount}
        >
          <strong>{t("profileSettings.deleteAccount")}</strong>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
