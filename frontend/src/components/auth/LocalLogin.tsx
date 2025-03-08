"use client";

import React, { useRef, useState } from "react";
import styles from "./LocalLogin.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiLoginBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/users";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";

const LocalLogin = () => {
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
      await login({
        email: emailElRef.current?.value || "",
        password: passwordElRef.current?.value || "",
      }).unwrap(); // ✅ `unwrap()` to handle promise properly

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

      <div className={styles.btnGroup}>
        <BackButton />
        <button className={styles.btn} type="submit">
          <RiLoginBoxLine size={22} className={styles.flipIcon} />
          {t("signin.login", { ns: "common" })}
        </button>
      </div>

      {error && (
        <p className={styles.error}>{t("login_failed", { ns: "common" })}</p>
      )}

      <Link className={styles.signupLink} href={"/signup"}>
        {t("signin.signup-invite", { ns: "common" })}
      </Link>
    </form>
  );
};

export default LocalLogin;
