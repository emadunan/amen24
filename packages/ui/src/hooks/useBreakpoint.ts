import { useState, useEffect } from "react";

const breakpoints = {
  smallPhone: 360,
  regularPhone: 480,
  largePhone: 600,
  tablet: 768,
  laptop: 1024,
} as const;

export const useBreakpoint = () => {
  const getWidths = () => {
    if (typeof window === "undefined") {
      // Return default values during SSR (assume desktop as safe fallback)
      return {
        isSmallPhone: false,
        isRegularPhone: false,
        isLargePhone: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: true,
      };
    }

    const width = window.innerWidth;
    return {
      isSmallPhone: width < breakpoints.smallPhone, // e.g., < 360
      isRegularPhone: width < breakpoints.regularPhone, // e.g., < 480
      isLargePhone: width < breakpoints.largePhone, // e.g., < 600
      isTablet: width < breakpoints.tablet, // e.g., < 768
      isLaptop: width < breakpoints.laptop,  // e.g., < 1024
      isDesktop: width >= breakpoints.laptop, // Desktop is 1024px and above
    };
  };

  const [breakpoint, setBreakpoint] = useState(getWidths);

  useEffect(() => {
    const handleResize = () => setBreakpoint(getWidths());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
