import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../components/ui/PageTitle";
import styles from "./GlossaryItem.module.css";
import { FaBackspace } from "react-icons/fa";
import {
  useGetOneTermQuery,
  useUpdateTermMutation,
} from "../store/glossaryApi";
import GlossaryTermDesc from "../components/glossary/GlossaryTermDesc";
import { showToast } from "@amen24/ui";
import {
  ApprovalStatus,
  BookKey,
  BookMap,
  GlossaryCategory,
  Lang,
  UserRole,
} from "@amen24/shared";
import { useGetMeQuery } from "../store/authApi";

const GlossaryItem: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const { data: user } = useGetMeQuery();
  const slug = params.slug;

  const { data: term } = useGetOneTermQuery(slug || "");

  const verseRef = React.useMemo(() => {
    if (!term?.verses?.length) return null;

    const verse = term.verses[0];
    const arabicVerse = verse.verseTranslations.find(
      (v) => v.lang === Lang.ARABIC,
    );
    const bookKey = verse.chapter.book.bookKey as BookKey;
    const bookTitleAr = BookMap[bookKey]?.title?.ar || bookKey;

    if (!arabicVerse?.textDiacritized) return null;

    return `${arabicVerse.textDiacritized} (${bookTitleAr} ${verse.chapter.num} : ${verse.num})`;
  }, [term]);

  const [updateTerm, _result] = useUpdateTermMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [nativeValue, setNativeValue] = useState(term?.native || "");

  React.useEffect(() => {
    if (term?.native) {
      setNativeValue(term.native);
    }
  }, [term?.native]);

  function handleBlurOrEnter(e: React.KeyboardEvent | React.FocusEvent) {
    if (
      ("key" in e && e.key === "Enter") ||
      ("type" in e && e.type === "blur")
    ) {
      setIsEditing(false);

      if (!term) {
        showToast("Invalid term value, update failed!");
        return;
      }

      const trimmedValue = nativeValue.trim();
      if (term.native === trimmedValue) return;
      updateTerm({
        slug: term.slug,
        native: trimmedValue,
        approvalStatus: ApprovalStatus.Pending,
      });
    }
  }

  function handleApproveTerm(slug: string) {
    updateTerm({ slug, approvalStatus: ApprovalStatus.Approved });
  }

  function handleRejectTerm(slug: string) {
    updateTerm({ slug, approvalStatus: ApprovalStatus.Rejected });
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.titleHeader}>
          <Link to={"/glossary"}>
            <FaBackspace className={styles.backLink} />
          </Link>

          <PageTitle className={styles.absoluteTitle}>/{slug}</PageTitle>
        </div>

        <div className={styles.termHeader}>
          {isEditing ? (
            <input
              value={nativeValue}
              onChange={(e) => setNativeValue(e.target.value)}
              onBlur={handleBlurOrEnter}
              onKeyDown={handleBlurOrEnter}
              autoFocus
              className={styles.editableInput}
            />
          ) : (
            <h3 onClick={() => setIsEditing(true)}>{nativeValue}</h3>
          )}

          <select
            className={styles.selectCategory}
            value={term?.category || ""}
            onChange={async (e) => {
              const category = e.target.value;
              if (term && category !== term.category) {
                await updateTerm({
                  slug: term.slug,
                  category: category as GlossaryCategory,
                  approvalStatus: ApprovalStatus.Pending,
                }).unwrap();
              }
            }}
          >
            {Object.entries(GlossaryCategory).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div>
        {term?.translations.map((bgt) => (
          <GlossaryTermDesc
            key={bgt.lang}
            arabicText={
              term.translations.find((t) => t.lang === Lang.ARABIC)
                ?.definition || ""
            }
            slug={term.slug}
            native={term.native}
            bgt={bgt}
            verseRef={verseRef ?? ""}
          />
        ))}
      </div>
      <div className={styles.actions}>
        {user?.profile.roles.includes(UserRole.ADMIN) &&
          term?.approvalStatus === ApprovalStatus.Pending && (
            <>
              <button
                onClick={handleApproveTerm.bind(null, term.slug)}
                className={`${styles.btn} ${styles.approveBtn}`}
              >
                Approve
              </button>
              <button
                onClick={handleRejectTerm.bind(null, term.slug)}
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

export default GlossaryItem;
