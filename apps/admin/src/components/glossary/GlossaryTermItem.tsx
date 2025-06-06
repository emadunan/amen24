import styles from "./GlossaryTermItem.module.css";
import { ApprovalStatus, BibleGlossary, UserRole } from "@amen24/shared";
import { NavLink } from "react-router-dom";
import React from "react";
import { ApprovalIcon } from "@amen24/ui";
import { useUpdateTermMutation } from "../../store/glossaryApi";
import { useGetMeQuery } from "../../store/authApi";

interface Props {
  item: BibleGlossary;
}

const GlossaryTermItem: React.FC<Props> = ({ item }) => {
  const { data: user } = useGetMeQuery();
  const [updateTerm, _result] = useUpdateTermMutation();

  function handleApproveTerm(slug: string) {
    updateTerm({ slug, approvalStatus: ApprovalStatus.Approved });
  }

  function handleRejectTerm(slug: string) {
    updateTerm({ slug, approvalStatus: ApprovalStatus.Rejected });
  }

  return (
    <div className={styles.item}>
      <NavLink
        to={`${item.slug}`}
        className={`${styles.btn} ${styles.openBtn}`}
      >
        /{item.slug}
      </NavLink>

      <p>[{item.native}]</p>
      <p> &mdash; {item.category}</p>
      <ApprovalIcon status={item.approvalStatus || ApprovalStatus.Pending} />

      <div className={styles.actions}>
        {user?.profile.roles.includes(UserRole.ADMIN) &&
          item.approvalStatus === ApprovalStatus.Pending && (
            <>
              <button
                onClick={handleApproveTerm.bind(null, item.slug)}
                className={`${styles.btn} ${styles.approveBtn}`}
              >
                Approve
              </button>
              <button
                onClick={handleRejectTerm.bind(null, item.slug)}
                className={`${styles.btn} ${styles.rejectBtn}`}
              >
                Reject
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default GlossaryTermItem;
