import React, { FC, Fragment } from "react";
import Spinner from "./Spinner";
import { RiLoginBoxLine } from "react-icons/ri";
import styles from "./SubmitButton.module.css";

interface Props {
  text?: string;
  isLoading?: boolean;
}

const SubmitButton: FC<Props> = ({ isLoading, text = "Submit" }) => {
  return (
    <button className={styles.btn} type="submit" disabled={isLoading}>
      {isLoading ? (
        <Spinner size="1rem" borderColor="background" />
      ) : (
        <Fragment>
          {" "}
          <RiLoginBoxLine size={22} className="flip-icon" />
          {text}
        </Fragment>
      )}
    </button>
  );
};

export default SubmitButton;
