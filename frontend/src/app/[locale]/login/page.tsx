import React, { FC } from "react";
import styles from "./page.module.css";
import initTranslations from "@/app/i18n";
import LocalLogin from "@/components/auth/LocalLogin";

interface Props {
  params: { locale: string };
}

const LoginPage: FC<Props> = async ({ params }) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  return (
    <div className={styles.container}>
      <LocalLogin />
    </div>
  );
};

export default LoginPage;
