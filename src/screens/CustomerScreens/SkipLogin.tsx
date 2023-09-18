//                                      --------->   NOT USED IN PRODUCTION

import React from "react";
import StyledView from "../../styles/styledComponents/StyledView";
import StyledText from "../../styles/styledComponents/StyledText";
import { screenHeight, screenWidth } from "../../utils/Dimensions";
import { StatusBar } from "expo-status-bar";
import { ThemeInterface } from "../../styles/theme";
import { useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBarHeight } from "../../utils/StatusbarHeight";
import StyledButton from "./../../styles/styledComponents/StyledButton";

const SkipLogin = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 75
      : (screenWidth / 100) * 90;

  const theme = useTheme<ThemeInterface>();

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} />
      <StyledView
        style={{
          width: imageSize,
          height: screenHeight - StatusBarHeight,
          alignSelf: "center",
          paddingVertical: 50,
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* HEADER */}
        <StyledView style={{ width: "100%", alignItems: "flex-start", gap: 5 }}>
          <StyledText style={{ fontSize: 32.5 }}>Skip Login 🤨</StyledText>
          <StyledText style={{ fontSize: 15, color: theme.colors.placeholder }}>
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
              Proceed without logging in ?
            </TypeWriter>
          </StyledText>
        </StyledView>
        {/* BUTTONS */}
        <StyledView style={{ width: "100%", alignItems: "center", gap: 50 }}>
          <StyledButton
            style={{ borderColor: theme.colors.primary }}
            mode="contained"
            onPress={() => console.log("first")}
          >
            Go to Marketplace
          </StyledButton>

          <StyledText style={{ color: theme.colors.placeholder }}>
            OR
          </StyledText>

          <StyledButton
            style={{ borderColor: theme.colors.primary }}
            mode="outlined"
            onPress={() => navigation.navigate("customerLogin")}
          >
            Login
          </StyledButton>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default SkipLogin;
