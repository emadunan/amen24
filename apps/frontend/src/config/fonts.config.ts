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

export const cardo = localFont({
  src: [
    {
      path: "../assets/fonts/Cardo/Cardo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Cardo/Cardo-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/Cardo/Cardo-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-cardo",
});
