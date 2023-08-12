import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeInterface } from "../styles/theme";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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
