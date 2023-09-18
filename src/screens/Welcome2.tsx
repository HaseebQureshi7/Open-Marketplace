import React from "react";
import { Image, StatusBar } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import StyledText from "../styles/styledComponents/StyledText";
import StyledView from "../styles/styledComponents/StyledView";
import { ThemeInterface } from "../styles/theme";
import { screenHeight, screenWidth } from "../utils/Dimensions";

const Welcome2 = ({ navigation }: any) => {
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
      <StatusBar animated={true} backgroundColor={backgroundColor} />
      <StyledView
        style={{
          width: "100%",
          paddingVertical: 50,
          backgroundColor: "#FECAC9",
        }}
      >
        <StyledText
          style={{
            position: "absolute",
            zIndex: 1,
            color: "#FFFFFF",
            fontSize: 30,
          }}
        >
          New Jacket ?
        </StyledText>
        <Image
          style={{ width: imageSize, height: imageSize }}
          source={require("../../assets/images/jacket.gif")}
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
          icon="chevron-up"
          mode="outlined"
          style={{ borderWidth: 3, borderColor: theme.colors.text }}
          iconColor={theme.colors.text}
          size={35}
          onPress={() => navigation.navigate("welcome3")}
        />
        <StyledText style={{ fontSize: 15 }}>
          {" "}
          <TypeWriter
            typing={1}
            maxDelay={50}
            numberOfLines={1}
            style={{
              textAlign: "right",
              width: "100%",
              paddingLeft: 2.5,
            }}
          >
            Again
          </TypeWriter>
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Welcome2;
