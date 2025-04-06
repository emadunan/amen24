"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/utils/toast";
import InputItem from "../ui/InputItem";
import BackButton from "../ui/BackButton";
import SubmitButton from "../ui/SubmitButton";
import { useTranslation } from "react-i18next";
import styles from "./PasswordRestoreForm.module.css";
import { useRestorePasswordMutation } from "@/store/userApi";
import { handleApiError } from "@/utils/handleApiError";
import { MdOutlineLockReset } from "react-icons/md";

const PasswordRestoreFrom = () => {
  const { t } = useTranslation(["error"]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const [restorePassword, { isLoading }] = useRestorePasswordMutation();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!token) {
      showToast("error:invalidOrExpiredToken", "error");
      return;
    }

    try {
      setLocalLoading(true);
      await restorePassword({ newPassword, token }).unwrap();

      router.replace("/login");
    } catch (error: unknown) {
      handleApiError(error, t);
    } finally {
      setLocalLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
        <BackButton />
        <SubmitButton
          isLoading={isLoading || localLoading}
          text={t("signin.resetPassword")}
          Icon={MdOutlineLockReset}
        />
      </div>
    </form>
  );
};

export default PasswordRestoreFrom;
