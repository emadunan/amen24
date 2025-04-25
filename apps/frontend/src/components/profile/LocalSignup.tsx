"use client";

import React, { useState } from "react";
import styles from "./LocalSignup.module.css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/store/userApi";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";
import InputItem from "../ui/InputItem";
import SubmitButton from "../ui/SubmitButton";
import { AuthProvider, ERROR_KEYS, Lang } from "@amen24/shared";
import { useFeedback } from "@amen24/ui";

const LocalSignup = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();
  const { showApiError, showError, showMessage } = useFeedback(t);

  // ✅ Use useState instead of useRef to persist input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [localLoading, setLocalLoading] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 4 || confirmPassword.length < 4) {
      showError(ERROR_KEYS.PASSWORD_TOO_SHORT);
      return;
    }

    if (password !== confirmPassword) {
      showError(ERROR_KEYS.PASSWORD_MISMATCH);
      return;
    }

    const finalDisplayName = displayName || email.split("@")[0] || "";

    setLocalLoading(true);

    try {
      const { message } = await signup({
        email,
        password,
        provider: AuthProvider.LOCAL,
        providerId: finalDisplayName,
        displayName: finalDisplayName,
        isActive: true,
        uiLang: i18n.language as Lang,
        bookmark: {
          last_read: t("bookmark.last_read"),
        },
      }).unwrap();

      showMessage(message, "success");
      router.replace("/login");
    } catch (err: unknown) {
      showApiError(err);
      setLocalLoading(false);
    }
  }

  if (isLoading || localLoading) {
    return <Spinner />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputItem
        type="email"
        value={email}
        onSetValue={setEmail}
        required
        placeholder={t("signin.email")}
      />

      <InputItem
        type="password"
        value={password}
        onSetValue={setPassword}
        required
        placeholder={t("signin.password")}
      />

      <InputItem
        type="password"
        value={confirmPassword}
        onSetValue={setConfirmPassword}
        required
        placeholder={t("signin.confirmPassword")}
      />

      <InputItem
        type="text"
        value={displayName}
        onSetValue={setDisplayName}
        placeholder={t("signin.displayName")}
      />

      <div className={styles.btnGroup}>
        <BackButton href="/login" />
        <SubmitButton text={t("signin.signup", { ns: "common" })} />
      </div>
    </form>
  );
};

export default LocalSignup;
