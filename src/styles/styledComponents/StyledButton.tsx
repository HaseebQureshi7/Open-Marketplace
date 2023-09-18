import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

interface StyledButtonProps extends ButtonProps {
  style?: ViewStyle;
  labelStyle?: TextStyle;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      style={{
        width: "100%",
        borderRadius: 5,
        padding: 5,
        borderWidth: 2,
        ...style,
      }}
      labelStyle={{
        fontSize: 15,
        fontFamily: "InterBold",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
