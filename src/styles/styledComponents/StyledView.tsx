import React from "react";
import { View, ViewStyle } from "react-native";

interface StyledViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const StyledView: React.FC<StyledViewProps> = ({ children, style }) => {
  const defaultStyles: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  const combinedStyles: ViewStyle = { ...defaultStyles, ...style };

  return <View style={combinedStyles}>{children}</View>;
};

export default StyledView;
