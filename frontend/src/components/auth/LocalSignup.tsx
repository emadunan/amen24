"use client";

import React, { useState } from "react";
import styles from "./LocalSignup.module.css";
import { useTranslation } from "react-i18next";
import { TiUserAdd } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/store/users";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";
import { showToast } from "@/utils/toast";

const LocalSignup = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // ✅ Use useState instead of useRef to persist input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [localLoading, setLocalLoading] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast(t("error.passwordMismatch"), "error");
      return;
    }

    const finalDisplayName = displayName || email.split("@")[0] || "";

    setLocalLoading(true);

    try {
      await signup({
        email,
        password,
        provider: "local",
        providerId: finalDisplayName,
        displayName: finalDisplayName,
        isActive: true,
      }).unwrap();

      router.replace("/");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as any).data === "object"
      ) {
        const errorData = (err as any).data;
        
        // If error message is an object with a key
        if (typeof errorData.message === "object" && "key" in errorData.message) {
          showToast(t(`error.${errorData.message.key}`), "error");
        } 
        // If message is a simple string
        else {
          showToast(t(`error.${errorData.message}`), "error");
        }
      } else {
        showToast(t("error.unknownError"), "error");
      }
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder={t("signin.email")}
      />

      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder={t("signin.password")}
      />

      <input
        className={styles.input}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder={t("signin.confirmPassword")}
      />

      <input
        className={styles.input}
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder={t("signin.displayName")}
      />

      <div className={styles.btnGroup}>
        <BackButton href="/login" />
        <button className={styles.btn} type="submit">
          <TiUserAdd size={22} className={styles.flipIcon} />
          {t("signin.signup", { ns: "common" })}
        </button>
      </div>
    </form>
  );
};

export default LocalSignup;