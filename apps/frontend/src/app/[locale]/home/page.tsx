import BibleSection from '@/components/home/BibleSection'
import FeaturedSection from '@/components/home/FeaturedSection'
import ExploreSection from '@/components/home/ExploreSection'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <FeaturedSection />
      <BibleSection />
      <ExploreSection />
    </div>
  )
}

export default HomePage;