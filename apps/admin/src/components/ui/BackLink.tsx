import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./BackLink.module.css";
import clsx from "clsx";

type Props = LinkProps & {
  className?: string;
  children?: React.ReactNode;
};

const BackLink: React.FC<Props> = ({
  to = "/",
  className,
  children = "← Back",
  ...props
}) => {
  return (
    <Link to={to} className={clsx(styles.backLink, className)} {...props}>
      {children}
    </Link>
  );
};

export default BackLink;
