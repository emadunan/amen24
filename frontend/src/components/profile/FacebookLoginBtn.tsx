"use client"

import React from "react";
import styles from "./FacebookLoginBtn.module.css";
import Image from "next/image";

const FacebookLoginButton = () => {
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/facebook";
  };

  return (
    <button className={styles.facebookButton} onClick={handleFacebookLogin}>
      <Image src="/icons8-facebook.svg" alt="Facebook" width={20} height={20}/>
      Continue with Facebook
    </button>
  );
};

export default FacebookLoginButton;
