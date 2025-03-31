import styles from "./MenuButton.module.css";

interface MenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      className={`${styles.burger} ${isOpen ? styles.active : ""}`}
      onClick={onClick}
      aria-label="Toggle Menu"
    >
      <span></span>
    </button>
  );
};

export default MenuButton;
