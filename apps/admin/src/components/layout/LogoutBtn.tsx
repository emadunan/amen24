import React from "react";
import styles from "./LogoutBtn.module.css";

interface Props {
  onLogout: () => Promise<void>;
}

const LogoutBtn: React.FC<Props> = ({ onLogout }) => {
  return (
    <button className={styles.logoutButton} onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
