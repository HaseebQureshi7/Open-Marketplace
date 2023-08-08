import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomerLogin from "../screens/CustomerScreens/CustomerLogin";
import CustomerSignup from "../screens/CustomerScreens/CustomerSignup";
import SkipLogin from "../screens/CustomerScreens/SkipLogin";
import SellerLogin from "../screens/SellerScreens/SellerLogin";
import SellerSignup from "../screens/SellerScreens/SellerSignup";
import Splash from "../screens/Splash";
import StartAs from "../screens/StartAs";
import Welcome1 from "../screens/Welcome1";
import Welcome2 from "../screens/Welcome2";
import Welcome3 from "../screens/Welcome3";
import SellerDashboard from "../screens/SellerScreens/SellerDashboard";
import NavDrawer from "./NavDrawer";
import CustomerDashboard from "../screens/CustomerScreens/CustomerDashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const MainStack = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const [user, setUser] = React.useState("no-user");

  (async () => {
    const ds = await AsyncStorage.getAllKeys();
    if (ds.includes("business")) {
      setUser("Business");
      console.log("Business Login");
    } else if (ds.includes("customer")) {
      setUser("Customer");
      console.log("Customer Login");
    } else {
      setUser("no-user");
      console.log("No User");
    }
  })();

  const MoveInFromCenterFromBottom = {
    ...TransitionPresets.RevealFromBottomAndroid, // Apply default slide animation
    headerShown: false,
  };

  const MoveInFromCenter = {
    ...TransitionPresets.ScaleFromCenterAndroid, // Apply default slide animation
    headerShown: false,
  };

  const SlideFromRight = {
    ...TransitionPresets.SlideFromRightIOS, // Apply default slide animation
    headerShown: false,
    // Add any other options specific to the custom screens
  };

  return (
    <NavigationContainer>
      {/* OPEN ROUTES */}
      <Stack.Navigator screenOptions={SlideFromRight}>
        {user === "no-user" && (
          <Stack.Group>
            <Stack.Screen
              name="splash"
              component={Splash}
              options={MoveInFromCenterFromBottom}
            />
            <Stack.Screen
              name="welcome1"
              component={Welcome1}
              options={MoveInFromCenterFromBottom}
            />
            <Stack.Screen
              name="welcome2"
              component={Welcome2}
              options={MoveInFromCenterFromBottom}
            />
            <Stack.Screen
              name="welcome3"
              component={Welcome3}
              options={MoveInFromCenterFromBottom}
            />
            <Stack.Screen
              name="startAs"
              component={StartAs}
              options={MoveInFromCenterFromBottom}
            />
            {/*OPEN SELLER ROUTES */}
            <Stack.Screen
              name="sellerLogin"
              component={SellerLogin}
              options={MoveInFromCenter}
            />
            <Stack.Screen
              name="sellerSignup"
              component={SellerSignup}
              options={SlideFromRight}
            />
            {/*OPEN CUSTOMER ROUTES */}
            <Stack.Screen
              name="skipLogin"
              component={SkipLogin}
              options={MoveInFromCenter}
            />
            <Stack.Screen
              name="customerLogin"
              component={CustomerLogin}
              options={SlideFromRight}
            />
            <Stack.Screen
              name="customerSignup"
              component={CustomerSignup}
              options={SlideFromRight}
            />
          </Stack.Group>
        )}
        {/* RESTRICTED SELLER ROUTES */}
        {user === "Business" && (
          <Stack.Screen name="sellerStack" options={SlideFromRight}>
            {() => (
              <Drawer.Navigator
                drawerContent={NavDrawer}
                screenOptions={{ headerShown: false, drawerType: "slide" }}
              >
                <Drawer.Group>
                  <Drawer.Screen name="dashboard" component={SellerDashboard} />
                </Drawer.Group>
              </Drawer.Navigator>
            )}
          </Stack.Screen>
        )}
        {/* RESTRICTED CUSTOMER ROUTES */}
        {user === "Customer" && (
          <Stack.Screen name="customerStack" options={SlideFromRight}>
            {() => (
              <Drawer.Navigator
                drawerContent={NavDrawer}
                screenOptions={{ headerShown: false, drawerType: "slide" }}
              >
                <Drawer.Group>
                  <Drawer.Screen
                    name="dashboard"
                    component={CustomerDashboard}
                  />
                </Drawer.Group>
              </Drawer.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
