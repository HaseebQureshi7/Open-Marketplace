import { screenWidth } from "./Dimensions";

type screenSizeTypes = "ultraWide" | "wide" | "narrow";

export const isLandscape = screenWidth > 700;
export const isLandscapeWide = screenWidth > 1000;
export const screenSize: screenSizeTypes = isLandscape
  ? isLandscapeWide
    ? "ultraWide"
    : "wide"
  : "narrow";
