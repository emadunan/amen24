"use client";

import React from "react";
import styles from "./FacebookLoginBtn.module.css";
import Image from "next/image";

const FacebookLoginButton = () => {
  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
  };

  return (
    <button className={styles.facebookButton} onClick={handleFacebookLogin}>
      <Image src="/facebookLogin.svg" alt="Facebook" width={20} height={20} />
      Continue with Facebook
    </button>
  );
};

export default FacebookLoginButton;
