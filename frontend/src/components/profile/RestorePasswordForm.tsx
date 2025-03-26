"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { showToast } from "@/utils/toast";
import InputItem from "../ui/InputItem";
import BackButton from "../ui/BackButton";
import SubmitButton from "../ui/SubmitButton";
import { useTranslation } from "react-i18next";
import styles from './RestorePasswordForm.module.css';
import { useRestorePasswordMutation } from "@/store/userApi";

const RestorePasswordFrom = () => {
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const [restorePassword, { isLoading }] = useRestorePasswordMutation();

  async function handleSubmit() {
    if (!token) {
      showToast("invalidOrExpiredToken", "error");
      return;
    }
    console.log(newPassword, token);
    

    await restorePassword({ newPassword, token }).unwrap();
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputItem
        type="password"
        value={newPassword}
        onSetValue={setNewPassword}
        placeholder={t("signin.password")}
        required
      />
      <InputItem
        type="password"
        value={confirmPassword}
        onSetValue={setConfirmPassword}
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
    </form>
  );
};

export default RestorePasswordFrom;
