"use client";

import styles from "./PasswordRequestForm.module.css";
import React, { useState } from "react";
import BackButton from "../ui/BackButton";
import SubmitButton from "../ui/SubmitButton";
import InputItem from "../ui/InputItem";
import { handleApiError } from "@/utils/handleApiError";
import { useTranslation } from "react-i18next";
import { useRequestPasswordMutation } from "@/store/userApi";
import { RiMailSendFill } from "react-icons/ri";
import Spinner from "../ui/Spinner";

const PasswordRequestFrom = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const [requestPassword, { isLoading }] = useRequestPasswordMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalLoading(true);

    try {
      const { message } = await requestPassword({ email }).unwrap();
      setMessage(message);
    } catch (err) {
      handleApiError(err, t);
    } finally {
      setLocalLoading(false);
    }
  }

  if (isLoading || localLoading) {
    return <Spinner />;
  }

  if (message) return <p>{message}</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputItem
        type="email"
        value={email}
        onSetValue={setEmail}
        placeholder={t("signin.email")}
        required
      />

      <div className={styles.btnGroup}>
        <BackButton />
        <SubmitButton
          isLoading={isLoading || localLoading}
          text={t("signin.sendResetLink", { ns: "common" })}
          Icon={RiMailSendFill}
        />
      </div>
    </form>
  );
};

export default PasswordRequestFrom;
