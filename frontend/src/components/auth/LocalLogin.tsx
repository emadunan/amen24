"use client"

import React, { useRef } from 'react';
import styles from "./localLogin.module.css";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { RiLoginBoxLine } from 'react-icons/ri';

const LocalLogin = () => {
  const { t } = useTranslation();

  const emailElRef = useRef<HTMLInputElement | null>(null);
  const passwordElRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailElRef.current?.value,
        password: passwordElRef.current?.value
      })
    }).then(response => response.json()).then(data => console.log(data)
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type='email' ref={emailElRef} />
      <input className={styles.input} type='password' ref={passwordElRef} />
      <button className={styles.loginBtn} type='submit'>{t("login", {ns: "common"})} <RiLoginBoxLine size={28} className={styles.flipIcon}/></button>
      <Link className={styles.signupLink} href={'/signup'}>{t("signup-invite", { ns: 'common' })}</Link>
    </form>
  )
}

export default LocalLogin;