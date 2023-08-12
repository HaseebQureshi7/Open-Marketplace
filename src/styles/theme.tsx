import { DefaultTheme } from "react-native-paper";

export interface ThemeInterface {
  dark: boolean;
  mode: "adaptive" | "exact";
  roundness: number;
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    onSurface: string;
    onSurfaceVariant: string;
    notification: string;
    myOwnColor: string;
    success: string;
    info: string;
    warning: string;
    error: string;
  };
  fonts: {
    bold: string;
    medium: string;
    light: string;
    thin: string;
  };
  animation: {
    scale: number;
    // Add other animation properties as needed
  };
  myOwnProperty: boolean;
}

export const theme: any = {
  ...DefaultTheme,
  dark: false,
  mode: "adaptive",
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6096B4",
    accent: "#6200EE",
    background: "#F6F6F6",
    onSurfaceVariant: "#727272", // Effects Input labels
    surface: "#FFFFFF",
    text: "#1D1E20",
    disabled: "#AFAFAF",
    placeholder: "#8F959E",
    backdrop: "#000000",
    onSurface: "#000000",
    notification: "#FF0266",
    myOwnColor: "#BADA55", // Custom color added
    success: "#4E9A51",
    info: "#1E95D6",
    warning: "#F68A1C",
    error: "#D74545",
  },
  fonts: {
    ...DefaultTheme.fonts,
    bold: "InterBold",
    medium: "InterMedium",
    light: "InterMedium",
    thin: "InterLight",
  },
  animation: {
    ...DefaultTheme.animation,
    scale: 1.0,
  },
  myOwnProperty: true, // Custom property added
};

// DEFAULT THEME VALUES

const defaultColors = {
  backdrop: "rgba(50, 47, 55, 0.4)",
  background: "rgba(255, 251, 254, 1)",
  elevation: {
    "(index)": "elevation",
    level0: "transparent",
    level1: "rgb(247, 243, 249)",
    level2: "rgb(243, 237, 246)",
    level3: "rgb(238, 232, 244)",
    level4: "rgb(236, 230, 243)",
    level5: "rgb(233, 227,241)",
  },
  error: "rgba(179, 38, 30, 1)",
  errorContainer: "rgba(249, 222, 220, 1)",
  inverseOnSurface: "rgba(244, 239, 244, 1)",
  inversePrimary: "rgba(208, 188, 255, 1)",
  inverseSurface: "rgba(49, 48, 51, 1)",
  onBackground: "rgba(28, 27, 31, 1)",
  onError: "rgba(255, 255, 255, 1)",
  onErrorContainer: "rgba(65, 14, 11, 1)",
  onPrimary: "rgba(255, 255, 255, 1)",
  onPrimaryContainer: "rgba(33, 0, 93, 1)",
  onSecondary: "rgba(255, 255, 255, 1)",
  onSecondaryContainer: "rgba(29, 25, 43, 1)",
  onSurface: "rgba(28, 27, 31, 1)",
  onSurfaceDisabled: "rgba(28, 27, 31, 0.38)",
  onSurfaceVariant: "rgba(73, 69, 79, 1)",
  onTertiary: "rgba(255, 255, 255, 1)",
  onTertiaryContainer: "rgba(49, 17, 29, 1)",
  outline: "rgba(121, 116, 126,1)",
  outlineVariant: "rgba(202, 196, 208, 1)",
  primary: "rgba(103, 80, 164, 1)",
  primaryContainer: "rgba(234, 221, 255, 1)",
  scrim: "rgba(0, 0, 0, 1)",
  secondary: "rgba(98, 91, 113, 1)",
  secondaryContainer: "rgba(232, 222, 248, 1)",
  shadow: "rgba(0, 0, 0, 1)",
  surface: "rgba(255, 251, 254, 1)",
  surfaceDisabled: "rgba(28, 27, 31, 0.12)",
  surfaceVariant: "rgba(231, 224, 236, 1)",
  tertiary: "rgba(125, 82, 96, 1)",
  tertiaryContainer: "rgba(255, 216, 228, 1)",
};

// DEFAULT FONTS

const defaultFonts = {
  bodyLarge: {
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: "sans-serif",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  default: { fontFamily: "sans-serif", fontWeight: "400", letterSpacing: 0 },
  displayLarge: {
    fontFamily: "sans-serif",
    fontSize: 57,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: "sans-serif",
    fontSize: 45,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: "sans-serif",
    fontSize: 36,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: "sans-serif",
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: "sans-serif",
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: "sans-serif",
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
  },
  labelLarge: {
    fontFamily: "sans-serif-medium",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: "sans-serif-medium",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: "sans-serif-medium",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  titleLarge: {
    fontFamily: "sans-serif",
    fontSize: 22,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: "sans-serif-medium",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: "sans-serif-medium",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
};
