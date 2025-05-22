import { FC } from "react";
import { useGetAllFeaturedQuery } from "../store/featuredApi";
import FeaturedListItem from "../components/featured/FeaturedListItem";
import styles from "./Featured.module.css";
import PageTitle from "../components/ui/PageTitle";

const Featured: FC = () => {
  const { data: featured } = useGetAllFeaturedQuery();

  console.log(featured);

  return (
    <div className={styles.featured}>
      <PageTitle>Featured</PageTitle>
      <div className={styles.featuredContainer}>
        {featured?.map(f => <FeaturedListItem key={f.id} featuredItem={f} />)}
      </div>
    </div>
  )
}

export default Featured