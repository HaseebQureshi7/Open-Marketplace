import * as React from "react";
import { Divider, Drawer, useTheme } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ThemeInterface } from "../styles/theme";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import StyledText from "../styles/styledComponents/StyledText";
import { Ionicons } from "@expo/vector-icons";
import StyledView from "../styles/styledComponents/StyledView";
import StyledButton from "../styles/styledComponents/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SnackbarContext } from "../context/SnackbarContext";
import { SnackStateTypes } from "../types/SnackDataTypes";
import { CommonActions } from "@react-navigation/native";

const NavDrawer = ({ navigation }: any) => {
  const theme = useTheme<ThemeInterface>();

  const { snackData, setSnackData }: SnackStateTypes =
    React.useContext(SnackbarContext);

    async function Logout() {
      await AsyncStorage.clear();
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'splash' }],
      }));
      setSnackData({
        open: true,
        text: "Logout was successful",
      });
    }

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
          alignItems: "center",
          justifyContent: "flex-start",
          // backgroundColor:'red',
          flexDirection: "row",
          marginLeft: "auto",
          paddingRight: 20,
          gap: 25,
          marginVertical: 25,
        }}
      >
        {/* <StyledText style={{fontSize:20, color:theme.colors.placeholder}}>Close</StyledText> */}
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
        style={{ width: "100%", gap: 5, paddingLeft: 30 }}
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
              color={theme.colors.primary}
            />
          )}
          label="Profile"
          onPress={() => console.log("first")}
        />
        <Divider style={{ width: "75%" }} />
        <Drawer.Item
          style={{
            width: "75%",
            borderRadius: 5,
            transform: [{ scale: 1.25 }],
          }}
          icon={() => (
            <SimpleLineIcons name="bag" size={20} color={theme.colors.accent} />
          )}
          label="Orders"
          onPress={() => console.log("first")}
        />
        <Divider style={{ width: "75%" }} />
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
              color={theme.colors.error}
            />
          )}
          label="Wishlist"
          onPress={() => console.log("first")}
        />
        <Divider style={{ width: "75%" }} />
      </Drawer.Section>

      {/* TAB LOGOUT*/}
      <StyledButton
        rippleColor={"white"}
        onPress={() => Logout()}
        style={{
          marginTop: "auto",
          backgroundColor: theme.colors.error,
          borderRadius: 0,
          marginBottom: 25,
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
