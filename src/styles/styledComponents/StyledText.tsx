import React from "react";
import { Text, TextStyle } from "react-native";
import { theme } from "../theme";

interface StyledTextProps {
  style?: TextStyle;
  children?: any;
}

const StyledText: React.FC<StyledTextProps> = ({ children, style }) => {
  const defaultStyles: TextStyle = {
    fontWeight: "600",
    fontFamily: "InterBold",
    color: theme.colors.text,
  };

  const combinedStyles: TextStyle = { ...defaultStyles, ...style };

  return <Text style={combinedStyles}>{children}</Text>;
};

export default StyledText;
