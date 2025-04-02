"use client"

import React from "react";
import styles from "./GoogleLoginBtn.module.css";
import Image from "next/image";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button className={styles.googleButton} onClick={handleGoogleLogin}>
      <Image src="/icons8-google.svg" alt="Google" width={20} height={20}/>
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
