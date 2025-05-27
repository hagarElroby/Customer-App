import { useEffect } from "react";

interface Breakpoints {
  [key: number]: number;
}

const useResponsiveItemsPerPage = (
  setItemsPerPage: (value: number) => void,
  breakpoints: Breakpoints = {
    768: 2,
    1024: 3,
    1200: 4,
    1440: 5,
    1600: 6,
  },
) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Find the corresponding value for the current width
      const sortedBreakpoints = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => a - b);
      for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
        if (width >= sortedBreakpoints[i]) {
          setItemsPerPage(breakpoints[sortedBreakpoints[i]]);
          break;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setItemsPerPage, breakpoints]);
};

export default useResponsiveItemsPerPage;
