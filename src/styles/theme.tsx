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
    background: "#F5F6FA",
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
