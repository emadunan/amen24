"use client";

import React, { useState } from "react";
import InputItem from "../ui/InputItem";
import styles from "./PasswordResetForm.module.css";
import { useTranslation } from "react-i18next";
import BackButton from "../ui/BackButton";
import SubmitButton from "../ui/SubmitButton";
import Spinner from "../ui/Spinner";
import { useResetPasswordMutation } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { MdOutlineLockReset } from "react-icons/md";
import { ERROR_KEYS } from "@amen24/shared";
import { useFeedback } from "@amen24/ui";

const PasswordResetForm = () => {
  const router = useRouter();
  const { t } = useTranslation(["error"]);
  const { showError, showApiError, showMessage } = useFeedback(t);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalLoading(true);

    if (newPassword !== confirmPassword) {
      showError(ERROR_KEYS.PASSWORD_MISMATCH);
      setLocalLoading(false);
      return;
    }

    try {
      const { message } = await resetPassword({
        oldPassword,
        newPassword,
      }).unwrap();
      router.replace("/login");
      showMessage(message);
    } catch (err) {
      showApiError(err);
    } finally {
      setLocalLoading(false);
    }
  }

  if (isLoading || localLoading) {
    return <Spinner />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputItem
        type="password"
        value={oldPassword}
        onSetValue={setOldPassword}
        placeholder={t("signin.oldPassword")}
        required
      />
      <InputItem
        type="password"
        value={newPassword}
        onSetValue={setNewPassword}
        placeholder={t("signin.newPassword")}
        required
      />
      <InputItem
        type="password"
        value={confirmPassword}
        onSetValue={setConfirmPassword}
        placeholder={t("signin.confirmPassword")}
        required
      />

      <div className={styles.btnGroup}>
        <BackButton href="/settings" />
        <SubmitButton
          isLoading={isLoading || localLoading}
          text={t("signin.resetPassword")}
          Icon={MdOutlineLockReset}
        />
      </div>
    </form>
  );
};

export default PasswordResetForm;
