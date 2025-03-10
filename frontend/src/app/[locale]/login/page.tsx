import React, { FC } from "react";
import styles from "./page.module.css";
import LocalLogin from "@/components/profile/LocalLogin";

interface Props {
  params: { locale: string };
}

const LoginPage: FC<Props> = async ({ params }) => {
  return (
    <div className={styles.container}>
      <LocalLogin />
    </div>
  );
};

export default LoginPage;
