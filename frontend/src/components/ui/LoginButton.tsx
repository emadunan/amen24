"use client"

import React from 'react';
import styles from "./LoginButton.module.css";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { RiLoginBoxLine } from "react-icons/ri";

const LoginButton = () => {
  const { t } = useTranslation();

  return (
    <Link href={"/login"} className={styles.loginLink}>
      {t("login")} <RiLoginBoxLine size={22} className={styles.flipIcon}/>
    </Link>
  )
}

export default LoginButton