import { View, Image, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "../utils/Dimensions";
import { IconButton, Text, useTheme } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";
import TypeWriter from "react-native-typewriter";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import StyledView from "../styles/styledComponents/StyledView";
import StyledText from "../styles/styledComponents/StyledText";

const Splash = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 20
      : (screenWidth / 100) * 65;

  const theme = useTheme<ThemeInterface>();

  const translateY = useSharedValue(0);

  // Gesture Controls and Callbacks
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (e) => {
      translateY.value = e.translationY;
      e.translationY < -200 ? runOnJS(navigation.navigate)("welcome1") : null;
      console.log(Math.abs(Math.floor(translateY.value) / 250));
    },
    onEnd: () => {
      translateY.value = withSpring(1);
    },
  });

  // Animated Value Change
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          Math.abs(Math.floor(translateY.value)) <= 200
            ? 1 - Math.abs(Math.floor(translateY.value))
            : Math.abs(Math.floor(translateY.value)),
      },
    ],
  }));

  return (
    <StyledView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <StatusBar backgroundColor={backgroundColor} />
      <Image
        style={{
          width: imageSize,
          height: imageSize,
        }}
        source={require("../../assets/images/Logo.png")}
      />
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 50,
              alignItems: "center",
              justifyContent: "center",
            },
            rStyle,
          ]}
        >
          <IconButton
            icon={"chevron-up"}
            size={30}
            iconColor={theme.colors.text}
          />
          <StyledText
            style={{
              color: theme.colors.text,
              fontSize:15
            }}
          >
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
              Pull up
            </TypeWriter>
          </StyledText>
        </Animated.View>
      </PanGestureHandler>
    </StyledView>
  );
};

export default Splash;
