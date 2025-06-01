import BibleSection from "@/components/home/MessiahSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import ExploreSection from "@/components/home/ExploreSection";
import React from "react";
import HeroSection from "@/components/home/HeroSection";

const HomePage = () => {
  return (
    <div style={{ height: "100%" }}>
      <HeroSection />
      <FeaturedSection />
      <BibleSection />
      <ExploreSection />
    </div>
  );
};

export default HomePage;
