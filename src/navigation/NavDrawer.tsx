import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  SimpleLineIcons,
  Foundation,
  FontAwesome5,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Divider, Drawer, useTheme } from "react-native-paper";
import { SnackbarContext } from "../context/SnackbarContext";
import { UserDataContext } from "../context/UserDataContext";
import StyledButton from "../styles/styledComponents/StyledButton";
import StyledText from "../styles/styledComponents/StyledText";
import StyledView from "../styles/styledComponents/StyledView";
import { ThemeInterface } from "../styles/theme";
import { SnackbarTypes, SnackStateProps } from "../types/SnackbarTypes";

const NavDrawer = ({ navigation }: any) => {
  const theme = useTheme<ThemeInterface>();

  const { snackData, setSnackData }: SnackStateProps =
    React.useContext(SnackbarContext);

  const { userData, setUserData }: any = React.useContext(UserDataContext);

  async function Logout() {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "splash" }],
      })
    );
    setSnackData({
      open: true,
      severity: "Info",
      text: "Logged out!",
    });
  }

  const sidebarMenu = [
    {
      icon: (
        <AntDesign
          name="profile"
          style={{}}
          size={22.5}
          color={theme.colors.placeholder}
        />
      ),
      title: "Profile",
    },
    {
      icon: (
        <AntDesign
          name="profile"
          style={{}}
          size={22.5}
          color={theme.colors.placeholder}
        />
      ),
      title: "New Orders",
    },
    {
      icon: (
        <AntDesign
          name="profile"
          style={{}}
          size={22.5}
          color={theme.colors.placeholder}
        />
      ),
      title: "Add Product",
    },
    {
      icon: (
        <AntDesign
          name="profile"
          style={{}}
          size={22.5}
          color={theme.colors.placeholder}
        />
      ),
      title: "Total Sales",
    },
  ];

  return (
    <StyledView
      style={{
        flex: 1,
        gap: 5,
        alignItems: "flex-start",
      }}
    >
      {/* LOGO */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginVertical: 30,
          paddingHorizontal: 15,
        }}
      >
        {/* LOGO HORIZONTAL */}
        <Image
          style={{ width: 135, aspectRatio: 4 }}
          source={require("../../assets/images/logo-horizontal.png")}
        />
      </View>

      {/* USER */}
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 5,
          paddingLeft: 40,
        }}
      >
        <StyledText
          style={{
            fontSize: 12.5,
            fontFamily: "InterMedium",
            color: theme.colors.placeholder,
          }}
        >
          {userData?.id ? "Logged in as" : "Not logged in"}
        </StyledText>
        {/* USER LOGIN INFO */}
        {userData?.name ? (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            <Foundation
              name="torso-business"
              size={30}
              color={theme.colors.text}
            />
            {/* <Fontisto name="person" size={25} color="black" /> */}
            <StyledText
              style={{
                fontSize: 20,
              }}
            >
              {userData?.name
                ? userData?.name
                : userData?.firstName + " " + userData?.lastName}
            </StyledText>
          </View>
        ) : userData?.firstName ? (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            {/* <Foundation name="torso-business" size={30} color={theme.colors.text} /> */}
            <Fontisto name="person" size={25} color="black" />
            <StyledText
              style={{
                fontSize: 20,
              }}
            >
              {userData?.name
                ? userData?.name
                : userData?.firstName + " " + userData?.lastName}
            </StyledText>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            <Fontisto name="person" size={25} color="black" />
            <StyledText
              style={{
                fontSize: 20,
              }}
            >
              No Login
            </StyledText>
          </View>
        )}
      </View>

      {/* CUSTOMER TABS */}
      {userData?.firstName && (
        <Drawer.Section
          showDivider={false}
          style={{ width: "100%", gap: 5, paddingLeft: 30 }}
        >
          {/* ORDERS */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <AntDesign
                name="shoppingcart"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Orders"
            onPress={() => console.log("orders")}
          />
          {/* WISHLIST */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <AntDesign
                name="heart"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Wishlist"
            onPress={() => console.log("first")}
          />
          {/* PROFILE */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <Ionicons
                name="person-circle"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Profile"
            onPress={() => console.log("profile")}
          />
        </Drawer.Section>
      )}

      {/* ACTIONS HEADER */}
      {/* <StyledText style={{ fontSize: 17.5, marginLeft:40, color: theme.colors.placeholder }}>
        ACTION MENU
      </StyledText> */}

      {/* SELLER TABS */}
      {userData?.name && (
        <Drawer.Section
          showDivider={false}
          style={{ width: "100%", gap: 5, paddingLeft: 30 }}
        >
          {/* PROFILE */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <Ionicons
                name="person-circle"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Manage Profile"
            onPress={() => console.log("first")}
          />
          {/* ADD PRODS */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <Ionicons
                name="ios-add-circle-sharp"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Add Products"
            onPress={() => navigation.navigate("addProducts")}
          />
          {/* NEW ORDERS */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <MaterialIcons
                name="new-releases"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="New Orders"
            onPress={() => console.log("first")}
          />
          {/* TOTAL SALES */}
          <Drawer.Item
            style={{
              width: "75%",
              borderRadius: 5,
              transform: [{ scale: 1.25 }],
            }}
            icon={() => (
              <SimpleLineIcons
                name="calculator"
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Total Sales"
            onPress={() => console.log("first")}
          />
        </Drawer.Section>
      )}

      {/* TAB LOGOUT*/}
      <StyledButton
        rippleColor={"white"}
        onPress={() => Logout()}
        style={{
          width: "75%",
          marginLeft: 40,
          marginTop: "auto",
          borderRadius: 5,
          marginBottom: 25,
        }}
        buttonColor="red"
        mode="contained"
        icon={() => <MaterialIcons name="logout" size={25} color={"white"} />}
        textColor="white"
      >
        Logout
      </StyledButton>
    </StyledView>
  );
};

export default NavDrawer;
