import { View, Image, Platform } from "react-native";
import React from "react";
import { screenHeight, screenWidth } from "../utils/Dimensions";
import { StatusBar } from "expo-status-bar";
import { IconButton, Text, useTheme } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";
import StyledText from "../styles/styledComponents/StyledText";
import StyledView from "../styles/styledComponents/StyledView";
import TypeWriter from "react-native-typewriter";

const Welcome1 = ({ navigation }: any) => {
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
          backgroundColor: "white",
        }}
      >
        <StyledText
          style={{
            position: "absolute",
            zIndex: 1,
            color: "#FFEDE5",
            fontSize: 30,
          }}
        >

            New Phone ?
        </StyledText>
        <Image
          style={{ width: imageSize, height: imageSize }}
          source={require("../../assets/images/phone.gif")}
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
          onPress={() => navigation.navigate("welcome2")}
          icon="chevron-up"
          mode="outlined"
          style={{ borderWidth: 3, borderColor: theme.colors.text }}
          iconColor={theme.colors.text}
          size={35}
        />
        <StyledText style={{ fontSize: 15 }}>
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
          Touch this
          </TypeWriter>
          </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Welcome1;
