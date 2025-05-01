"use client";

import React, { useState } from "react";
import styles from "./LocalLogin.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/apis/authApi";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";
import InputItem from "../ui/InputItem";
import SubmitButton from "../ui/SubmitButton";
import Image from "next/image";
import { useFeedback } from "@amen24/ui";

const LocalLogin = () => {
  const { t } = useTranslation(["error"]);
  const router = useRouter();
  const { showApiError } = useFeedback(t);

  // ✅ Controlled Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [showFrom, setShowForm] = useState(false);

  // ✅ Use RTK Query mutation hook (No `localLoading`)
  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await login({ email, password }).unwrap();
      router.replace("/");
    } catch (err) {
      showApiError(err);
      setLocalLoading(false);
    }
  }

  if (isLoading || localLoading) {
    return <Spinner />;
  }

  if (!showFrom) {
    return (
      <button
        className={styles.showForm}
        onClick={() => setShowForm((prev) => !prev)}
      >
        <Image src="/emailLogin.svg" alt="email" width={20} height={20} />
        {t("signin.emailLogin")}
      </button>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputItem
        type="email"
        value={email}
        onSetValue={setEmail}
        placeholder={t("signin.email")}
        required
      />
      <InputItem
        type="password"
        value={password}
        onSetValue={setPassword}
        placeholder={t("signin.password")}
        required
      />

      <div className={styles.btnGroup}>
        <BackButton />
        <SubmitButton
          isLoading={isLoading || localLoading}
          text={t("signin.login")}
        />
      </div>

      <div className={styles.linkGroup}>
        <Link className={styles.signupLink} href={"/contact-us"}>
          {t("signin.password-invite")}
        </Link>

        <Link className={styles.signupLink} href={"/signup"}>
          {t("signin.signup-invite")}
        </Link>
      </div>
    </form>
  );
};

export default LocalLogin;
