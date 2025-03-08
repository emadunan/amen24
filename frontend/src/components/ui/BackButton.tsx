import Link from 'next/link'
import React, { FC } from 'react'
import styles from "./BackButton.module.css";
import { TiArrowBack } from 'react-icons/ti'
import { useTranslation } from 'react-i18next';

interface Props {
  href?: string;
}

const BackButton: FC<Props> = ({ href }) => {
  const { t } = useTranslation();

  return (
    <Link href={href ?? "/"} className={styles.btn}>
      <TiArrowBack size={22} className="flip-icon" />
      {t("back")}
    </Link>
  );
}

export default BackButton