"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./LocalLogin.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiLoginBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useGetMeQuery, useLoginMutation } from "@/store/users";
import Spinner from "../ui/Spinner";

const LocalLogin = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: user } = useGetMeQuery();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

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
      <input className={styles.input} type="email" ref={emailElRef} required />
      <input
        className={styles.input}
        type="password"
        ref={passwordElRef}
        required
      />

      <button className={styles.loginBtn} type="submit">
        {t("login", { ns: "common" })}
        <RiLoginBoxLine size={28} className={styles.flipIcon} />
      </button>

      {error && (
        <p className={styles.error}>{t("login_failed", { ns: "common" })}</p>
      )}

      <Link className={styles.signupLink} href={"/signup"}>
        {t("signup-invite", { ns: "common" })}
      </Link>
    </form>
  );
};

export default LocalLogin;
