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
    notification: string;
    myOwnColor: string;
  };
  fonts: {
    regular: string;
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
    surface: "#FFFFFF",
    text: "#333333",
    disabled: "#AFAFAF",
    placeholder: "#727272",
    backdrop: "#000000",
    onSurface: "#000000",
    notification: "#FF0266",
    myOwnColor: "#BADA55", // Custom color added
  },
  fonts: {
    ...DefaultTheme.fonts,
    bold: "InterBold",
    medium: "InterMedium",
    light: "InterMedium",
    thin: "InterMedium",
  },
  animation: {
    ...DefaultTheme.animation,
    scale: 1.0,
  },
  myOwnProperty: true, // Custom property added
};
