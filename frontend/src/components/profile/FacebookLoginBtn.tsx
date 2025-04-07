"use client";

import React from "react";
import styles from "./FacebookLoginBtn.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const FacebookLoginButton = () => {
  const { t, i18n } = useTranslation();

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook?lang=${i18n.language}`;
  };

  return (
    <button className={styles.facebookButton} onClick={handleFacebookLogin}>
      <Image src="/facebookLogin.svg" alt="Facebook" width={20} height={20} />
      {t("signin.facebookLogin")}
    </button>
  );
};

export default FacebookLoginButton;
