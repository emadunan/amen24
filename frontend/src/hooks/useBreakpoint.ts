import { useState, useEffect } from "react";

const breakpoints = {
  smallPhone: 360,
  regularPhone: 480,
  largePhone: 600,
  tablet: 768,
} as const;

const useBreakpoint = () => {
  const getWidths = () => {
    const width = window.innerWidth;
    return {
      isSmallPhone: width < breakpoints.smallPhone, // e.g., < 360
      isRegularPhone: width < breakpoints.regularPhone, // e.g., < 480
      isLargePhone: width < breakpoints.largePhone, // e.g., < 600
      isTablet: width < breakpoints.tablet, // e.g., < 768
      isDesktop: width >= breakpoints.tablet, // Desktop is 768px and above
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

export default useBreakpoint;
