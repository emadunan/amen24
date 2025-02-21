import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import styles from "./layout.module.css";
import { notFound } from "next/navigation";
import i18nConfig from "@/config/next-i18n-router.config";
import { FC } from "react";
import initTranslations from "../i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "amen24",
  description: "Amen24 is a free non-profitable project to introduce bible content for all",
};

const i18nNamespaces = ['common', 'book', 'lang', 'ui'];

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: string }
}

const RootLayout: FC<Props> = async ({ children, params }) => {
  const { locale } = await params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const dir = locale === "ar" ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
          <AppHeader />
          <main className={styles.main}>
            {children}
          </main>
          <AppFooter />
        </TranslationsProvider>
      </body>
    </html>
  );
}

export default RootLayout;
