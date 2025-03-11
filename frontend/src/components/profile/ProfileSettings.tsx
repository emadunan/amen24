import React from 'react';
import styles from "./ProfileSettings.module.css";


const ProfileSettings = () => {
  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Profile Settings</h2>

      {/* Email Display */}
      <div className={styles.profileSection}>
        <label className={styles.label}>Email</label>
        <div className={styles.email}>{/* User Email Here */} user@example.com</div>
      </div>

      {/* Connected Accounts */}
      <div className={styles.profileSection}>
        <label className={styles.label}>Connected Accounts</label>
        <ul className={styles.accountList}>
          <li className={styles.accountItem}>
            Google <button className={styles.deleteBtn}>✖</button>
          </li>
          <li className={styles.accountItem}>
            Facebook <button className={styles.deleteBtn}>✖</button>
          </li>
        </ul>
      </div>

      {/* Font Size Slider */}
      <div className={styles.profileSection}>
        <label className={styles.label}>Font Size</label>
        <input type="range" min="12" max="24" className={styles.slider} />
      </div>

      {/* Diacritization Toggle */}
      <div className={styles.profileSection}>
        <label className={styles.label}>Diacritized Text</label>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.sliderRound}></span>
        </label>
      </div>

      {/* Delete Account Button */}
      <div className={styles.deleteSection}>
        <button className={styles.deleteAccountBtn}>Delete Account Permanently</button>
      </div>
    </div>
  )
}

export default ProfileSettings