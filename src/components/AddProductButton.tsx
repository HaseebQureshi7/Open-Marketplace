import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";

const AddProductButton = () => {
  const theme = useTheme<ThemeInterface>();

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("addProducts")}
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
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
