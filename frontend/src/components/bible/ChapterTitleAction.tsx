"use client"

import { toggle } from "@/store/navigatorSlice";
import React, { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import styles from "./ChapterTitleAction.module.css";

interface Props {
  children: ReactNode;
}

const ChapterTitleAction: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <span className={styles.title} onClick={() => dispatch(toggle())}>
      {children}
    </span>
  );
};

export default ChapterTitleAction;
