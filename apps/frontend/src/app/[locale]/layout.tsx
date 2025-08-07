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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  const title = t("meta.siteTitle", { defaultValue: "Amen24 - Bible for All" });
  const description = t("meta.siteDescription", {
    defaultValue: "Amen24 is a free, non-profit platform offering Bible content in multiple languages.",
  });

  const url = `https://amen24.org/${locale}`;
  const imageUrl = "https://amen24.org/img/og-default.jpg?v=2";

  return {
    title,
    description,
    metadataBase: new URL("https://amen24.org"),
    openGraph: {
      title,
      description,
      url,
      siteName: "Amen24",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: "/img/logo-light.png",
    },
  };
}

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
