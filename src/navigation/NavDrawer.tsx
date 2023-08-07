import * as React from "react";
import { Drawer, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { ThemeInterface } from "../styles/theme";
import { MaterialIcons, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import StyledText from "../styles/styledComponents/StyledText";
import { Ionicons } from "@expo/vector-icons";

const NavDrawer = ({ navigation }: { navigation: any }) => {
  const [active, setActive] = React.useState("");

  const theme = useTheme<ThemeInterface>();

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, gap: 5 }}>
      {/* CLOSE */}
      <TouchableOpacity
        onPress={() => navigation.closeDrawer()}
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          // paddingLeft: 20,
          marginVertical: 25,
        }}
      >
        <AntDesign
          name="menu-fold"
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
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {/* <Image
          style={{ width: 50, height: 50, borderRadius: 10 }}
          source={require("../../assets/default-dp.jpg")}
        /> */}
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingHorizontal: 15,
          }}
        >
          <StyledText style={{ fontSize: 15, color: theme.colors.placeholder }}>
            Logged in as
          </StyledText>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "InterBold",
            }}
          >
            Haseeb Qureshi
          </Text>
        </View>
      </View>

      {/* TAB ADD PRODUCT */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddProduct")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
          marginLeft: 5,
        }}
      >
        <Feather name="info" size={25} color={theme.colors.text} />
        <Text
          style={{
            fontSize: 17.5,
            padding: 10,
            fontFamily: "InterMedium",
            color: theme.colors.text,
          }}
        >
          Add Products
        </Text>
      </TouchableOpacity>

      {/* TAB ORDER */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
          marginLeft: 5,
        }}
      >
        <SimpleLineIcons name="bag" size={25} color={theme.colors.text} />
        <Text
          style={{
            fontSize: 17.5,
            padding: 15,
            fontFamily: "InterMedium",
            color: theme.colors.text,
          }}
        >
          Order
        </Text>
      </TouchableOpacity>

      {/* TAB WISHLIST */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Wishlist")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
          marginLeft: 5,
        }}
      >
        <Ionicons name="heart-outline" size={25} color={theme.colors.text} />
        <Text
          style={{
            fontSize: 17.5,
            padding: 15,
            fontFamily: "InterMedium",
            color: theme.colors.text,
          }}
        >
          Wishlist
        </Text>
      </TouchableOpacity>

      {/* TAB SETTINGS*/}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
          marginLeft: 5,
        }}
      >
        <Ionicons
          name="ios-settings-outline"
          size={25}
          color={theme.colors.text}
        />
        <Text
          style={{
            fontSize: 17.5,
            padding: 15,
            fontFamily: "InterMedium",
            color: theme.colors.text,
          }}
        >
          Settings
        </Text>
      </TouchableOpacity>

      {/* TAB LOGOUT*/}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
          margin: 10,
          paddingBottom: 10,
          marginTop: "auto",
        }}
      >
        <MaterialIcons name="logout" size={25} color={theme.colors.error} />
        <Text
          style={{
            fontSize: 17.5,
            padding: 15,
            fontFamily: "InterMedium",
            color: theme.colors.error,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavDrawer;
