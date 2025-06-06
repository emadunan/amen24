import { FC } from "react";
import { useGetFeaturedTextQuery } from "../store/featuredApi";
import { useParams, Link } from "react-router-dom";
import FeaturedItemTitle from "../components/featured/FeaturedItemTitle";
import FeaturedTranslationText from "../components/featured/FeaturedTranslationText";
import styles from "./FeaturedItem.module.css";

const FeaturedItem: FC = () => {
  const { id } = useParams();
  if (!id) throw new Error("Id not found");

  const { data: featuredText } = useGetFeaturedTextQuery(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <Link to="/featured" className={styles.backLink}>
          ← Back
        </Link>
        {featuredText && (
          <FeaturedItemTitle featuredItem={featuredText[0].featured} />
        )}
      </div>

      <div className={styles.translationList}>
        {featuredText?.map((f) => (
          <FeaturedTranslationText key={f.id} featuredTextItem={f} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedItem;
