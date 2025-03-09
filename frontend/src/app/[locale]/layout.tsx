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

import localFont from "next/font/local";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";

const amiri = localFont({
  src: [
    {
      path: "../../assets/fonts/Amiri/Amiri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Amiri/Amiri-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/Amiri/Amiri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Amiri/Amiri-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "amen24",
  description:
    "Amen24 is a free non-profitable project to introduce bible content for all",
};

const i18nNamespaces = ["common", "book", "lang", "ui", "privacy", "terms"];

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

// async function getUser() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("access_token")?.value;

//   if (!token) return null;

//   const res = await fetch(`http://localhost:5000/users/me`, {
//     headers: { Cookie: `access_token=${token}` },
//     credentials: "include",
//     cache: "no-store", // Ensure fresh auth state
//   });

//   if (!res.ok) return null;

//   return res.json();
// }

const RootLayout: FC<Props> = async ({ children, params }) => {
  const { locale } = await params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

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
            <AppMain>{children}</AppMain>
            <AppFooter />
          </TranslationsProvider>
        </StoreProvider>
        <ToastContainer toastStyle={{ fontFamily: "amiri, serif" }}/>
        </body>
    </html>
  );
};

export default RootLayout;
