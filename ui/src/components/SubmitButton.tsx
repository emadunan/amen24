import React, { FC } from "react";
import { Spinner } from "./Spinner";
import { RiLoginBoxLine } from "react-icons/ri";
import styles from "./SubmitButton.module.css";

interface Props {
  text?: string;
  isLoading?: boolean;
  Icon?: React.ElementType;
}

export const SubmitButton: FC<Props> = ({
  isLoading,
  text = "Submit",
  Icon = RiLoginBoxLine,
}) => {
  return (
    <button className={styles.btn} type="submit" disabled={isLoading}>
      {isLoading ? (
        <Spinner size="1rem" borderColor="background" />
      ) : (
        <>
          <Icon size={22} className="flip-icon" />
          {text}
        </>
      )}
    </button>
  );
};
