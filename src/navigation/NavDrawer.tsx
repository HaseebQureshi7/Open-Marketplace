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
import { Image, Text, Pressable, View } from "react-native";
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
            {/* <Foundation
              name="torso-business"
              size={30}
              color={theme.colors.text}
            /> */}
            {/* <Fontisto name="person" size={25} color="black" /> */}
            <StyledText
              style={{
                fontSize: 25,
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
            {/* <Fontisto name="person" size={25} color="black" /> */}
            <StyledText
              style={{
                fontSize: 25,
              }}
            >
              {userData?.name
                ? userData?.name
                : userData?.firstName + " " + userData?.lastName.slice(0,1)+"."}
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
            {/* <Fontisto name="person" size={25} color="black" /> */}
            <StyledText
              style={{
                fontSize: 25,
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
                  padding: 7.5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Orders"
            onPress={() => navigation.navigate("placedOrders")}
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
                  padding: 7.5,
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
                  padding: 7.5,
                  backgroundColor: theme.colors.background,
                  borderRadius: 5,
                }}
                size={12.5}
                color={theme.colors.placeholder}
              />
            )}
            label="Profile"
            onPress={() => navigation.navigate("customerProfile")}
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
          style={{ width: "100%", gap: 35, paddingLeft: 40 }}
        >
          {/* PROFILE */}
          <Pressable
            onPress={() => navigation.navigate("profileScreen")}
            style={{
              width: "75%",
              borderRadius: 5,
              flexDirection: "row",
              gap: 15,
            }}
          >
            <MaterialIcons
              name="person-outline"
              style={{
                padding: 5,
                backgroundColor: theme.colors.background,
                borderRadius: 2.5,
              }}
              size={17.5}
              color={theme.colors.placeholder}
            />
            <StyledText
              style={{
                fontFamily: theme.fonts.medium,
                fontSize: 17.5,
                color: theme.colors.placeholder,
              }}
            >
              Profile
            </StyledText>
          </Pressable>

          {/* ADD PRODS */}
          <Pressable
            onPress={() => navigation.navigate("addProducts")}
            style={{
              width: "75%",
              borderRadius: 5,
              flexDirection: "row",
              gap: 15,
            }}
          >
            <Ionicons
              name="ios-add-circle-sharp"
              style={{
                padding: 5,
                backgroundColor: theme.colors.background,
                borderRadius: 2.5,
              }}
              size={17.5}
              color={theme.colors.placeholder}
            />
            <StyledText
              style={{
                fontFamily: theme.fonts.medium,
                fontSize: 17.5,
                color: theme.colors.placeholder,
              }}
            >
              Add Product
            </StyledText>
          </Pressable>

          {/* NEW ORDERS */}
          <Pressable
            onPress={() => navigation.navigate("newOrders")}
            style={{
              width: "75%",
              borderRadius: 5,
              flexDirection: "row",
              gap: 15,
            }}
          >
            <MaterialIcons
              name="new-releases"
              style={{
                padding: 5,
                backgroundColor: theme.colors.background,
                borderRadius: 2.5,
              }}
              size={17.5}
              color={theme.colors.placeholder}
            />
            <StyledText
              style={{
                fontFamily: theme.fonts.medium,
                fontSize: 17.5,
                color: theme.colors.placeholder,
              }}
            >
              New Orders
            </StyledText>
          </Pressable>

          {/* TOTAL SALES */}
          <Pressable
            onPress={() => navigation.navigate("totalSales")}
            style={{
              width: "75%",
              borderRadius: 2.5,
              flexDirection: "row",
              gap: 15,
            }}
          >
            <SimpleLineIcons
              name="calculator"
              style={{
                padding: 5,
                backgroundColor: theme.colors.background,
                borderRadius: 5,
              }}
              size={17.5}
              color={theme.colors.placeholder}
            />
            <StyledText
              style={{
                fontFamily: theme.fonts.medium,
                fontSize: 17.5,
                color: theme.colors.placeholder,
              }}
            >
              Total Sales
            </StyledText>
          </Pressable>
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
