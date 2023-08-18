import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";

const AddProductButton = () => {
  const theme = useTheme<ThemeInterface>();

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("addProducts")}
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // paddingLeft: 20,
        marginTop: 10,
      }}
    >
      <Ionicons
        name="add"
        style={{
          padding: 12.5,
          borderRadius: 5,
          backgroundColor: theme.colors.background,
        }}
        size={25}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default AddProductButton;
