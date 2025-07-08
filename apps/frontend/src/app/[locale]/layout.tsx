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
import { amiri, cardo } from "@/config/fonts.config";
import Script from "next/script";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import TrackVisit from "@/components/analytics/TrackVisite";
import AudioPlayer from "@/components/ui/AudioPlayer";
import { getDirection, Lang } from "@amen24/shared";
import "@amen24/ui/dist/index.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "amen24",
  description:
    "Amen24 is a free non-profitable project to introduce bible content for all",
  icons: {
    icon: "/img/favicon.ico",
  },
};

const i18nNamespaces = [
  "common",
  "book",
  "writer",
  "lang",
  "privacy",
  "terms",
  "month",
  "error",
  "message",
];

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const RootLayout: FC<Props> = async ({ children, params }) => {
  const { locale } = await params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const { resources } = await initTranslations(locale, i18nNamespaces);

  const dir = getDirection(locale as Lang);

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-7915506753470331" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7915506753470331"
          crossOrigin="anonymous"
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          strategy="afterInteractive"
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `,
          }}
        />
      </head>
      <body className={`${amiri.className} ${cardo.variable}`}>
        <StoreProvider>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <AppHeader />
            <BibleNavigation />
            <AudioPlayer />
            <AppMain>
              {children}
              <GoogleAnalytics />
            </AppMain>
            <AppFooter />
          </TranslationsProvider>
        </StoreProvider>
        <TrackVisit />
        <ToastContainer toastStyle={{ fontFamily: "amiri, serif" }} />
      </body>
    </html>
  );
};

export default RootLayout;
