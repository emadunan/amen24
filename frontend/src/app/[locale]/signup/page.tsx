import LocalSignup from "@/components/profile/LocalSignup";
import React from "react";
import styles from "./page.module.css";

const SignupPage = () => {
  return (
    <div className={styles.container}>
      <LocalSignup />
    </div>
  );
};

export default SignupPage;
