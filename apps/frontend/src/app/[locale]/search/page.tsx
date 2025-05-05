import BibleSearch from "@/components/bible/BibleSearch";
import { Lang, PageMetadata } from "@amen24/shared";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{ book: string[]; locale: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  let lang = (await params).locale as Lang;

  if (lang !== Lang.ENGLISH && lang !== Lang.ARABIC) {
    lang = Lang.ENGLISH;
  }

  return {
    title: PageMetadata.search.title[lang],
    description: PageMetadata.search.description[lang],
  }
}

const SearchPage = () => {
  return <BibleSearch />;
};

export default SearchPage;
