"use client";

import React, { useRef, useState } from "react";
import styles from "./LocalSignup.module.css";
import { useTranslation } from "react-i18next";
import { TiUserAdd } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/store/users";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";

const LocalSignup = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const emailElRef = useRef<HTMLInputElement | null>(null);
  const passwordElRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordElRef = useRef<HTMLInputElement | null>(null);
  const displayNameElRef = useRef<HTMLInputElement | null>(null);

  // ✅ Use RTK Query mutation hook
  const [signup, { isLoading, error }] = useSignupMutation();
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordElRef.current?.value !== confirmPasswordElRef.current?.value) {
      setLocalError("Password and confirm password does not match");
      return;
    }

    let displayName = displayNameElRef.current?.value;

    if (!displayName) {
      displayName = emailElRef.current?.value.split("@").at(0);
    }

    setLocalLoading(true);

    try {
      await signup({
        email: emailElRef.current?.value || "",
        password: passwordElRef.current?.value || "",
        provider: "local",
        providerId: displayName,
        displayName,
        isActive: true,
      }).unwrap();

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
        ref={confirmPasswordElRef}
        required
        placeholder={t("signin.confirmPassword")}
      />

      <input
        className={styles.input}
        type="text"
        ref={displayNameElRef}
        placeholder={t("signin.displayName")}
      />

      <div className={styles.btnGroup}>
        <BackButton href="/login" />
        <button className={styles.btn} type="submit">
          <TiUserAdd size={22} className={styles.flipIcon} />
          {t("signin.signup", { ns: "common" })}
        </button>
      </div>

      {localError && (
        <p className={styles.error}>{t(localError, { ns: "common" })}</p>
      )}

      {error && (
        <p className={styles.error}>{t("signup_failed", { ns: "common" })}</p>
      )}
    </form>
  );
};

export default LocalSignup;
