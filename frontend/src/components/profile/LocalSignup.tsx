"use client";

import React, { useState } from "react";
import styles from "./LocalSignup.module.css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/store/userApi";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";
import { showToast } from "@/utils/toast";
import InputItem from "../ui/InputItem";
import SubmitButton from "../ui/SubmitButton";
import { handleApiError } from "@/utils/handleApiError";
import { AuthProvider, Lang } from "@amen24/shared";

const LocalSignup = () => {
  const { t, i18n } = useTranslation();
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
        provider: AuthProvider.LOCAL,
        providerId: finalDisplayName,
        displayName: finalDisplayName,
        isActive: true,
        uiLang: i18n.language as Lang
      }).unwrap();

      router.replace("/");
    } catch (err: unknown) {
      handleApiError(err, t);
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
