"use client";

import React from "react";
import styles from "./GoogleLoginBtn.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const GoogleLoginButton = () => {
  const { t } = useTranslation();
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button className={styles.googleButton} onClick={handleGoogleLogin}>
      <Image src="/googleLogin.svg" alt="Google" width={20} height={20} />
      {t("signin.googleLogin")}
    </button>
  );
};

export default GoogleLoginButton;
