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
import { GetUserType } from "../utils/GetUserType";
import AddProducts from "../screens/SellerScreens/AddProducts";
import ViewAllCategories from "../screens/SellerScreens/ViewAllCategories";
import CategoryScreen from "../screens/SellerScreens/CategoryScreen";
import ViewAllProducts from "../screens/SellerScreens/ViewAllProducts";
import ProductScreen from "../screens/SellerScreens/ProductScreen";
import ProfileScreen from "../screens/SellerScreens/ProfileScreen";
import NewOrders from "../screens/SellerScreens/NewOrders";
import TotalSales from "../screens/SellerScreens/TotalSales";
import EditProduct from "../screens/SellerScreens/EditProduct";

const MainStack = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const [user, setUser] = React.useState("no-user");

  GetUserType().then((res) =>
    res === "Business"
      ? setUser("Business")
      : res === "Customer"
      ? setUser("Customer")
      : setUser("no-user")
  );

  // TEST
  // React.useEffect(() => {
  //   console.log("main stack ran !!!")
  // }, [user])

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
                <Drawer.Screen name="mainThread">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="dashboard"
                        component={SellerDashboard}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="addProducts"
                        component={AddProducts}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="viewAllCategories"
                        component={ViewAllCategories}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="categoryScreen"
                        component={CategoryScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="viewAllProducts"
                        component={ViewAllProducts}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="productScreen"
                        component={ProductScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="profileScreen"
                        component={ProfileScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="newOrders"
                        component={NewOrders}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="totalSales"
                        component={TotalSales}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="editProduct"
                        component={EditProduct}
                        options={SlideFromRight}
                      />
                    </Stack.Navigator>
                  )}
                </Drawer.Screen>
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
                <Drawer.Screen name="mainThread">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="dashboard"
                        component={CustomerDashboard}
                        options={SlideFromRight}
                      />
                    </Stack.Navigator>
                  )}
                </Drawer.Screen>
              </Drawer.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
