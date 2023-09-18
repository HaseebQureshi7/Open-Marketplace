import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";

const BackButton = () => {
  const theme = useTheme<ThemeInterface>();

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // paddingLeft: 20,
        marginTop: 10,
      }}
    >
      <Ionicons
        name="arrow-back"
        style={{
          padding: 12.5,
          borderRadius: 5,
          backgroundColor: theme.colors.background,
        }}
        size={25}
        color={theme.colors.placeholder}
      />
    </Pressable>
  );
};

export default BackButton;
