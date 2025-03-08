"use client";

import React, { useRef, useState } from "react";
import styles from "./LocalSignup.module.css";
import { useTranslation } from "react-i18next";
import { TiUserAdd } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/users";
import Spinner from "../ui/Spinner";
import Link from "next/link";
import BackButton from "../ui/BackButton";

const LocalSignup = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const emailElRef = useRef<HTMLInputElement | null>(null);
  const passwordElRef = useRef<HTMLInputElement | null>(null);

  // ✅ Use RTK Query mutation hook
  const [login, { isLoading, error }] = useLoginMutation();
  const [localLoading, setLocalLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalLoading(true);

    try {
      // Sign-up
      // await login({
      //   email: emailElRef.current?.value || "",
      //   password: passwordElRef.current?.value || "",
      // }).unwrap();

      router.replace("/");
    } catch (err) {
      console.error("Login failed:", err);
      setLocalLoading(false);
    }
  }

  if (isLoading || localLoading) {
    return <Spinner />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="email"
        ref={emailElRef}
        required
        placeholder={t("signin.email")}
      />

      <input
        className={styles.input}
        type="password"
        ref={passwordElRef}
        required
        placeholder={t("signin.password")}
      />

      <input
        className={styles.input}
        type="password"
        ref={passwordElRef}
        required
        placeholder={t("signin.confirmPassword")}
      />

      <input
        className={styles.input}
        type="text"
        ref={emailElRef}
        placeholder={t("signin.displayName")}
      />

      <div className={styles.btnGroup}>
        <BackButton href="/login"/>
        <button className={styles.btn} type="submit">
          <TiUserAdd size={22} className={styles.flipIcon} />
          {t("signin.signup", { ns: "common" })}
        </button>
      </div>

      {error && (
        <p className={styles.error}>{t("signup_failed", { ns: "common" })}</p>
      )}
    </form>
  );
};

export default LocalSignup;
