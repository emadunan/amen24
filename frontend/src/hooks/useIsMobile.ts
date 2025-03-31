import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Define the breakpoint

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    checkScreenSize(); // Set initial value
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
