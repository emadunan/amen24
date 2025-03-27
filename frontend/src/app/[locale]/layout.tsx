import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import { notFound } from "next/navigation";
import i18nConfig from "@/config/next-i18n-router.config";
import { FC } from "react";
import initTranslations from "../i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";
import AppMain from "@/components/layout/AppMain";
import StoreProvider from "../../providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import BibleNavigation from "@/components/bible/BibleNavigator";
import { amiri } from "@/config/fonts.config";

export const metadata: Metadata = {
  title: "amen24",
  description:
    "Amen24 is a free non-profitable project to introduce bible content for all",
};

const i18nNamespaces = [
  "common",
  "book",
  "lang",
  "ui",
  "privacy",
  "terms",
  "month",
];

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

const RootLayout: FC<Props> = async ({ children, params }) => {
  const { locale } = await params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const { resources } = await initTranslations(locale, i18nNamespaces);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={amiri.className}>
        <StoreProvider>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <AppHeader />
            <BibleNavigation />
            <AppMain>{children}</AppMain>
            <AppFooter />
          </TranslationsProvider>
        </StoreProvider>
        <ToastContainer toastStyle={{ fontFamily: "amiri, serif" }} />
      </body>
    </html>
  );
};

export default RootLayout;
