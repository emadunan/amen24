import { FC } from "react";
import { useGetAllFeaturedQuery } from "../store/featuredApi";
import FeaturedListItem from "../components/featured/FeaturedListItem";
import styles from "./Featured.module.css";
import { Lang } from "@amen24/shared";

const Featured: FC = () => {
  const { data: featured } = useGetAllFeaturedQuery({ lang: Lang.ARABIC });

  console.log(featured);

  return (
    <div className={styles.featured}>
      <div className={styles.featuredContainer}>
        {featured?.map((f) => <FeaturedListItem key={f.id} featuredItem={f} />)}
      </div>
    </div>
  );
};

export default Featured;
