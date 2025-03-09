"use client";

import React, { Fragment, useState } from "react";
import styles from "./LocalLogin.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiLoginBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/users";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/utils/toast";

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

    try {
      setLocalLoading(true);
      await login({ email, password }).unwrap();
      router.replace("/");
    } catch (err) {
      showToast(t("error.loginFailed"), "error");

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

      <div className={styles.btnGroup}>
        <BackButton />
        <button className={styles.btn} type="submit" disabled={isLoading}>
          {isLoading || localLoading ? (
            <Spinner size="1rem" borderColor="background" />
          ) : (
            <Fragment>
              {" "}
              <RiLoginBoxLine size={22} className={styles.flipIcon} />
              {t("signin.login", { ns: "common" })}
            </Fragment>
          )}
        </button>
      </div>

      <Link className={styles.signupLink} href={"/signup"}>
        {t("signin.signup-invite", { ns: "common" })}
      </Link>
    </form>
  );
};

export default LocalLogin;
