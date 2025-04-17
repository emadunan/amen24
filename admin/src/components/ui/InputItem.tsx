import React, { FC } from "react";
import styles from "./InputItem.module.css";

interface Props {
  value: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onSetValue: (value: React.SetStateAction<string>) => void;
  required?: boolean;
}

const InputItem: FC<Props> = ({
  value,
  placeholder,
  type = "text",
  onSetValue,
  required,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={(e) => onSetValue(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default InputItem;
