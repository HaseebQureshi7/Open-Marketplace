import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import StyledText from "../styles/styledComponents/StyledText";
import StyledView from "../styles/styledComponents/StyledView";
import { ThemeInterface } from "../styles/theme";
import { screenHeight, screenWidth } from "../utils/Dimensions";

const StartAs = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 15
      : (screenWidth / 100) * 35;

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
          gap: 50,
        }}
      >
        {/* Seller Tab */}
        <Pressable
          onPress={() => navigation.navigate("sellerLogin")}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: Platform.OS === "web" ? 30 : 50,
            backgroundColor: "#FFD200",
          }}
        >
          <StyledText
            style={{
              position: "absolute",
              zIndex: 1,
              color: "white",
              fontSize: 30,
            }}
          >
            Here to Sell ?
          </StyledText>
          <Image
            style={{ width: imageSize, height: imageSize }}
            source={require("../../assets/images/seller.gif")}
          />
        </Pressable>

        {/* Middle Text */}
        <StyledView style={{ position: "absolute" }}>
          <StyledText style={{ fontSize: 15, color: theme.colors.disabled }}>
            {" "}
            <TypeWriter
              initialDelay={3000}
              typing={1}
              maxDelay={50}
              numberOfLines={1}
              style={{
                textAlign: "right",
                width: "100%",
                paddingLeft: 2.5,
              }}
            >
              Touch to interact
            </TypeWriter>
          </StyledText>
        </StyledView>

        {/* Buyer Tab */}
        <Pressable
          onPress={() => navigation.navigate("customerLogin")}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: Platform.OS === "web" ? 30 : 50,
            backgroundColor: "#CCE3F8",
          }}
        >
          <StyledText
            style={{
              position: "absolute",
              zIndex: 1,
              color: "white",
              fontSize: 30,
            }}
          >
            Here to Buy ?
          </StyledText>
          <Image
            style={{ width: imageSize, height: imageSize }}
            source={require("../../assets/images/buyer.gif")}
          />
        </Pressable>
      </StyledView>
    </StyledView>
  );
};

export default StartAs;
