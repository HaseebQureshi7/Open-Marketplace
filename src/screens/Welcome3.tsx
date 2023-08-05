import { View, Text, StatusBar, Image } from "react-native";
import React from "react";
import { screenHeight, screenWidth } from "../utils/Dimensions";
import { useTheme, IconButton } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";
import StyledText from "../styles/styledComponents/StyledText";
import StyledView from "../styles/styledComponents/StyledView";

const Welcome3 = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 20
      : (screenWidth / 100) * 45;

  const theme = useTheme<ThemeInterface>();

  return (
    <StyledView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <StatusBar backgroundColor={backgroundColor} />
      <StyledView
        style={{
          width: "100%",
          paddingVertical: 50,
        }}
      >
        <StyledText
          style={{
            position: "absolute",
            zIndex: 1,
            color: theme.colors.text,
            fontSize: 30,
          }}
        >
          New Decor ?
        </StyledText>
        <Image
          style={{ width: imageSize, height: imageSize }}
          source={require("../../assets/images/window.gif")}
        />
      </StyledView>
      <StyledView
        style={{
          position: "absolute",
          bottom: 20,
          gap: 15,
        }}
      >
        <IconButton
          icon="chevron-right"
          mode="outlined"
          style={{ borderWidth: 3, borderColor: theme.colors.text }}
          iconColor={theme.colors.text}
          size={35}
          onPress={() => console.log("Pressed")}
        />
        <StyledText style={{ fontSize: 20 }}>Finish</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Welcome3;
