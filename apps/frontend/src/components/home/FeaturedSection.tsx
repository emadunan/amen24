"use client"

import React from 'react';
import { useGetAllFeaturedQuery } from '@/store/apis/featuredApi'
import { FeaturedPosition, Lang } from '@amen24/shared'
import { useTranslation } from 'react-i18next';
import styles from './FeaturedSection.module.css';
import FeaturedParagraph from './FeaturedParagraph';

const FeaturedSection = () => {
  const { i18n } = useTranslation();

  const { data: featured1 } = useGetAllFeaturedQuery({ lang: i18n.language as Lang, position: FeaturedPosition.HOMEPAGE_FEATURED_1 });
  const { data: featured2 } = useGetAllFeaturedQuery({ lang: i18n.language as Lang, position: FeaturedPosition.HOMEPAGE_FEATURED_2 });
  const { data: featured3 } = useGetAllFeaturedQuery({ lang: i18n.language as Lang, position: FeaturedPosition.HOMEPAGE_FEATURED_3 });

  const featured1BkpJSX = <p>وَقَالَ ٱلرَّبُّ ٱلْإِلَهُ: «لَيْسَ جَيِّدًا أَنْ يَكُونَ آدَمُ وَحْدَهُ، فَأَصْنَعَ لَهُ مُعِينًا نَظِيرَهُ». .. فَأَوْقَعَ ٱلرَّبُّ ٱلْإِلَهُ سُبَاتًا عَلَى آدَمَ فَنَامَ، فَأَخَذَ وَاحِدَةً مِنْ أَضْلَاعِهِ وَمَلَأَ مَكَانَهَا لَحْمًا. وَبَنَى ٱلرَّبُّ ٱلْإِلَهُ ٱلضِّلْعَ ٱلَّتِي أَخَذَهَا مِنْ آدَمَ ٱمْرَأَةً وَأَحْضَرَهَا إِلَى آدَمَ. فَقَالَ آدَمُ: «هَذِهِ ٱلْآنَ عَظْمٌ مِنْ عِظَامِي وَلَحْمٌ مِنْ لَحْمِي. هَذِهِ تُدْعَى ٱمْرَأَةً لِأَنَّهَا مِنِ ٱمْرِءٍ أُخِذَتْ». لِذَلِكَ يَتْرُكُ ٱلرَّجُلُ أَبَاهُ وَأُمَّهُ وَيَلْتَصِقُ بِٱمْرَأَتِهِ وَيَكُونَانِ جَسَدًا وَاحِدًا.</p>
  const featured2BkpJSX = <p>لُحَيْظَةً تَرَكْتُكِ، وَبِمَرَاحِمَ عَظِيمَةٍ سَأَجْمَعُكِ. بِفَيَضَانِ ٱلْغَضَبِ حَجَبْتُ وَجْهِي عَنْكِ لَحْظَةً، وَبِإِحْسَانٍ أَبَدِيٍّ أَرْحَمُكِ، قَالَ وَلِيُّكِ ٱلرَّبُّ. لِأَنَّهُ كَمِيَاهِ نُوحٍ هَذِهِ لِي. كَمَا حَلَفْتُ أَنْ لَا تَعْبُرَ بَعْدُ مِيَاهُ نُوحٍ عَلَى ٱلْأَرْضِ، هَكَذَا حَلَفْتُ أَنْ لَا أَغْضَبَ عَلَيْكِ وَلَا أَزْجُرَكِ. فَإِنَّ ٱلْجِبَالَ تَزُولُ، وَٱلْآكَامَ تَتَزَعْزَعُ، أَمَّا إِحْسَانِي فَلَا يَزُولُ عَنْكِ، وَعَهْدُ سَلَامِي لَا يَتَزَعْزَعُ، قَالَ رَاحِمُكِ ٱلرَّبُّ.</p>
  const featured3BkpJSX = <p>أَنْتُمْ نُورُ ٱلْعَالَمِ. لَا يُمْكِنُ أَنْ تُخْفَى مَدِينَةٌ مَوْضُوعَةٌ عَلَى جَبَلٍ، وَلَا يُوقِدُونَ سِرَاجًا وَيَضَعُونَهُ تَحْتَ ٱلْمِكْيَالِ، بَلْ عَلَى ٱلْمَنَارَةِ فَيُضِيءُ لِجَمِيعِ ٱلَّذِينَ فِي ٱلْبَيْتِ. فَلْيُضِئْ نُورُكُمْ هَكَذَا قُدَّامَ ٱلنَّاسِ، لِكَيْ يَرَوْا أَعْمَالَكُمُ ٱلْحَسَنَةَ، وَيُمَجِّدُوا أَبَاكُمُ ٱلَّذِي فِي ٱلسَّمَاوَاتِ. «لَا تَظُنُّوا أَنِّي جِئْتُ لِأَنْقُضَ ٱلنَّامُوسَ أَوِ ٱلْأَنْبِيَاءَ. مَا جِئْتُ لِأَنْقُضَ بَلْ لِأُكَمِّلَ. فَإِنِّي ٱلْحَقَّ أَقُولُ لَكُمْ: إِلَى أَنْ تَزُولَ ٱلسَّمَاءُ وَٱلْأَرْضُ لَا يَزُولُ حَرْفٌ وَاحِدٌ أَوْ نُقْطَةٌ وَاحِدَةٌ مِنَ ٱلنَّامُوسِ حَتَّى يَكُونَ ٱلْكُلُّ.</p>

  return (
    <section className={styles.featuredContainer}>
      {featured1 ? <FeaturedParagraph featured={featured1?.at(0)} lang={i18n.language as Lang} /> : featured1BkpJSX}
      {featured2 ? <FeaturedParagraph featured={featured2?.at(0)} lang={i18n.language as Lang} /> : featured2BkpJSX}
      {featured3 ? <FeaturedParagraph featured={featured3?.at(0)} lang={i18n.language as Lang} /> : featured3BkpJSX}
    </section>
  )
}

export default FeaturedSection