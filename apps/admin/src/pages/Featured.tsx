import { FC } from "react";
import { useGetAllFeaturedQuery } from "../store/featuredApi";
import FeaturedListItem from "../components/featured/FeaturedListItem";
import styles from "./Featured.module.css";

const Featured: FC = () => {
  const { data: featured } = useGetAllFeaturedQuery();

  console.log(featured);

  return (
    <div className={styles.featured}>
      <h3 className={styles.title}>Featured</h3>
      <div className={styles.featuredContainer}>
        {featured?.map(f => <FeaturedListItem key={f.id} featuredItem={f} />)}
      </div>
    </div>
  )
}

export default Featured