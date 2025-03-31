"use client";

import React, { useState } from "react";
import styles from "./LocalLogin.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/userApi";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";
import InputItem from "../ui/InputItem";
import SubmitButton from "../ui/SubmitButton";
import { handleApiError } from "@/utils/handleApiError";

const LocalLogin = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // ✅ Controlled Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  // ✅ Use RTK Query mutation hook (No `localLoading`)
  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await login({ email, password }).unwrap();
      router.replace("/");
    } catch (err) {
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
          text={t("signin.login", { ns: "common" })}
        />
      </div>

      <div className={styles.linkGroup}>
        <Link className={styles.signupLink} href={"/contact-us"}>
          {t("signin.password-invite", { ns: "common" })}
        </Link>

        <Link className={styles.signupLink} href={"/signup"}>
          {t("signin.signup-invite", { ns: "common" })}
        </Link>
      </div>
    </form>
  );
};

export default LocalLogin;
