import React from "react";
import { View, ViewStyle, ViewProps } from "react-native";

interface StyledViewProps extends ViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const StyledView: React.FC<StyledViewProps> = ({ children, style, ...props }) => {
  const defaultStyles: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  const combinedStyles: ViewStyle = { ...defaultStyles, ...style };

  return <View style={combinedStyles} {...props}>{children}</View>;
};

export default StyledView;
