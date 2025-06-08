import {
  compareBreakpoints,
  defaultBreakpointsMap as defMap,
  useBreakpointFits,
  useCurrentBreakpoint,
} from "use-react-breakpoint";
const useCustomBreakpoint = (
  breakpoints = ["md"],
  breakpointList = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    "3xl": 1920,
    "4xl": 2560,
  }
) => {
  const getBreakpointsList = () => {
    return {
      ...defMap,
      ...breakpointList,
    };
  };

  const getBreakpoints = (quantity) => {
    switch (quantity) {
      case 1:
        if (typeof breakpoints === "object") {
          return breakpoints[0];
        }
        return breakpoints;
      case 2:
        if (typeof breakpoints === "object") {
          return [breakpoints[0], breakpoints[1]];
        }
        return [breakpoints, breakpoints];
      default:
        return breakpoints;
    }
  };

  const current = useCurrentBreakpoint(getBreakpointsList());

  const breakpointGTE = useBreakpointFits(
    getBreakpoints(1),
    getBreakpointsList()
  );

  const compare =
    compareBreakpoints(
      getBreakpoints(2)[0],
      getBreakpoints(2)[1],
      getBreakpointsList()
    ) === "fits"
      ? "smaller"
      : "bigger";

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scrollPositionY = window.scrollY;
    const scrollPositionX = window.scrollX;

  return { current, breakpointGTE, compare, windowWidth, windowHeight, scrollPositionY, scrollPositionX };
};

export default useCustomBreakpoint;
