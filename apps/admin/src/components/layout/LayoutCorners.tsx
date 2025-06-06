import styles from "./LayoutCorners.module.css";

const LayoutCorners = () => {
  return (
    <>
      <div className={`${styles.corner} ${styles.topLeft}`} />
      <div className={`${styles.corner} ${styles.topRight}`} />
      <div className={`${styles.corner} ${styles.bottomLeft}`} />
      <div className={`${styles.corner} ${styles.bottomRight}`} />
    </>
  );
};

export default LayoutCorners;
