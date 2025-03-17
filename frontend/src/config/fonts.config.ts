import localFont from "next/font/local";

export const amiri = localFont({
  src: [
    {
      path: "../assets/fonts/Amiri/Amiri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Amiri/Amiri-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/Amiri/Amiri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Amiri/Amiri-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-amiri",
});
