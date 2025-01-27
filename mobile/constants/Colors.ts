/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#3E1D10"; // Darker for better contrast
const tintColorDark = "#F8EBD3"; // Slightly lighter for readability

export const Colors = {
  light: {
    text: "#2B190E", // Darker for better contrast against light background
    background: "#FBF7EF", // Slightly lighter to enhance overall contrast
    tint: tintColorLight,
    icon: "#789E75", // Darker green for contrast
    tabIconDefault: "#789E75", // Match icon color
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#FFFFFF", // Pure white for maximum contrast
    background: "#121212", // Standard dark background
    tint: tintColorDark,
    icon: "#D9B280", // Slightly lighter gold for contrast
    tabIconDefault: "#D9B280", // Match icon color
    tabIconSelected: tintColorDark,
  },
};
