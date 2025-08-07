import BibleSearch from "@/components/bible/BibleSearch";
import { Metadata } from "next";
import React from "react";
import { searchPageMetadata } from "@amen24/shared";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const fallback = searchPageMetadata["en"];
  const metadata = searchPageMetadata[locale] || fallback;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://amen24.org/${locale}/search`,
      siteName: "Amen24",
      type: "website",
      images: [
        {
          url: "https://amen24.org/img/og-default.jpg?v=2",
          width: 1200,
          height: 630,
          alt: "Amen24 Bible Search",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["https://amen24.org/img/og-default.jpg?v=2"],
    },
  };
}

const SearchPage = () => {
  return <BibleSearch />;
};

export default SearchPage;
