import { useState, useEffect, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { SnackbarTypes } from "../types/SnackbarTypes";
import StyledText from "../styles/styledComponents/StyledText";
import Animation, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  Layout,
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated";
import { SnackbarContext } from "../context/SnackbarContext";
import { ThemeInterface } from "../styles/theme";
import { useTheme } from "react-native-paper";

interface SnackProps {
  snackData: SnackbarTypes;
}

const Snackbar = ({ snackData }: SnackProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(snackData.open);

  const { snackData: snackbarData }: any = useContext(SnackbarContext);

  const theme = useTheme<ThemeInterface>();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(false);
    }, 4000);
    setIsOpen(snackData.open);
    return () => clearInterval(interval);
  }, [snackbarData]);

  if (isOpen) {
    return (
      <Animation.View
        entering={FadeInUp.delay(400)}
        exiting={FadeOutDown}
        style={{
          width: "80%",
          padding: 25,
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          alignSelf: "flex-end",
        }}
      >
        <View
          style={{
            padding: 1,
            width: "70%",
            alignSelf: "flex-end",
            backgroundColor: theme.colors.background,
            borderRadius: 7.5,
          }}
        >
          <Pressable
            onPress={() => setIsOpen(false)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: 15,
              //   paddingHorizontal: 10,
              backgroundColor:
                snackData?.severity == "Success"
                  ? theme.colors.success
                  : snackData?.severity == "Info"
                  ? theme.colors.info
                  : snackData?.severity == "Warning"
                  ? theme.colors.warning
                  : theme.colors.error,
              borderRadius: 7.5,
            }}
          >
            {snackData?.severity == "Success" && (
              <Ionicons
                name="checkmark-done-circle-outline"
                size={24}
                color={theme.colors.background}
              />
            )}
            {snackData?.severity == "Info" && (
              <Feather name="info" size={20} color={theme.colors.background} />
            )}
            {snackData?.severity == "Warning" && (
              <Entypo
                name="warning"
                size={18}
                color={theme.colors.background}
              />
            )}
            {snackData?.severity == "Error" && (
              <MaterialIcons
                name="error-outline"
                size={24}
                color={theme.colors.background}
              />
            )}

            <StyledText
              style={{
                fontSize: 15,
                width: "75%",
                paddingRight: 5,
                textAlign: "right",
                color: theme.colors.background,
              }}
            >
              {snackData?.text}
            </StyledText>
          </Pressable>
        </View>
      </Animation.View>
    );
  } else {
    return null;
  }
};

export default Snackbar;
