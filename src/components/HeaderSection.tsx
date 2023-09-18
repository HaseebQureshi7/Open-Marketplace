import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import StyledText from "../styles/styledComponents/StyledText";
import { ThemeInterface } from "../styles/theme";

interface HeaderTypes {
  heading: string;
  subHeading: string;
}

const HeaderSection = ({ heading, subHeading }: HeaderTypes) => {
  const theme = useTheme<ThemeInterface>();
  return (
    <View>
      <StyledText
        style={{
          fontSize: 25,
          color: theme.colors.text,
        }}
      >
        {heading}
      </StyledText>
      <StyledText
        style={{
          fontSize: 15,
          color: theme.colors.placeholder,
          fontFamily: theme.fonts.medium,
        }}
      >
        <TypeWriter
          // initialDelay={1000}
          typing={1}
          maxDelay={0}
          numberOfLines={1}
          style={{
            textAlign: "right",
            width: "100%",
            paddingLeft: 2.5,
          }}
        >
          {subHeading}
        </TypeWriter>
      </StyledText>
    </View>
  );
};

export default HeaderSection;
