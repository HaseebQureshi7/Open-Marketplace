import * as React from "react";
import { Drawer, useTheme } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ThemeInterface } from "../styles/theme";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import StyledText from "../styles/styledComponents/StyledText";
import { Ionicons } from "@expo/vector-icons";
import StyledView from "../styles/styledComponents/StyledView";
import StyledButton from "../styles/styledComponents/StyledButton";

const NavDrawer = ({ navigation }: { navigation: any }) => {
  const theme = useTheme<ThemeInterface>();

  return (
    <StyledView
      style={{
        flex: 1,
        gap: 5,
        alignItems: "flex-start",
      }}
    >
      {/* CLOSE */}
      <TouchableOpacity
        onPress={() => navigation.closeDrawer()}
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingLeft: 20,
          marginVertical: 25,
        }}
      >
        <Entypo
          name="cross"
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.background,
          }}
          size={25}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      {/* USER */}
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
          paddingLeft: 20,
        }}
      >
        <StyledText
          style={{
            fontSize: 15,
            fontFamily: "InterMedium",
            color: theme.colors.placeholder,
          }}
        >
          Logged in as
        </StyledText>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "InterBold",
          }}
        >
          Trends Fashion
        </Text>
      </View>

      {/* CUSTOMER TABS */}
      <Drawer.Section
        showDivider={false}
        style={{ width: "100%", gap: 10, paddingLeft: 20 }}
      >
        <Drawer.Item
          style={{
            width: "75%",
            borderRadius: 5,
            transform: [{ scale: 1.25 }],
          }}
          icon={() => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={20}
              color={theme.colors.placeholder}
            />
          )}
          label="Profile"
          onPress={() => console.log("first")}
        />
        <Drawer.Item
          style={{
            width: "75%",
            borderRadius: 5,
            transform: [{ scale: 1.25 }],
          }}
          icon={() => (
            <SimpleLineIcons
              name="bag"
              size={20}
              color={theme.colors.placeholder}
            />
          )}
          label="Orders"
          onPress={() => console.log("first")}
        />
        <Drawer.Item
          style={{
            width: "75%",
            borderRadius: 5,
            transform: [{ scale: 1.25 }],
          }}
          icon={() => (
            <Ionicons
              name="heart-outline"
              size={20}
              color={theme.colors.placeholder}
            />
          )}
          label="Wishlist"
          onPress={() => console.log("first")}
        />
      </Drawer.Section>

      {/* TAB LOGOUT*/}
      <StyledButton
        style={{
          marginTop: "auto",
          backgroundColor: theme.colors.error,
          borderRadius: 0,
          marginBottom:25
        }}
        mode="contained"
        icon={() => <MaterialIcons name="logout" size={25} color={"white"} />}
      >
        Logout
      </StyledButton>
    </StyledView>
  );
};

export default NavDrawer;
