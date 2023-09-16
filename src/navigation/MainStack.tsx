import "react-native-gesture-handler";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
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
import CustomerProfile from "../screens/CustomerScreens/CustomerProfile";
import PlacedOrders from "../screens/CustomerScreens/PlacedOrders";
import DeliveryDetailsScreen from "../screens/CustomerScreens/DeliveryDetailsScreen";
import CheckoutScreen from "../screens/CustomerScreens/CheckoutScreen";
import OrderConfirmed from "../screens/CustomerScreens/OrderConfirmed";
import StyledView from "../styles/styledComponents/StyledView";
import { useTheme, Drawer as Dw } from "react-native-paper";
import { ThemeInterface } from "../styles/theme";
import { Pressable, View } from "react-native";
import { Image } from "react-native";
import StyledButton from "../styles/styledComponents/StyledButton";
import StyledText from "../styles/styledComponents/StyledText";
import { SnackStateProps } from "../types/SnackbarTypes";
import { SnackbarContext } from "../context/SnackbarContext";
import { UserDataContext } from "../context/UserDataContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import Wishlist from "../screens/CustomerScreens/Wishlist";

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
  };

  // NAV DRAWER MOVED INTO MAINSTACK DUE TO NAV DRAWER NOT UPDATING WITH THE DOM TREE
  const NavDrawer = ({ navigation }: any) => {
    const theme = useTheme<ThemeInterface>();

    const { snackData, setSnackData }: SnackStateProps =
      React.useContext(SnackbarContext);

    const { userData, setUserData }: any = React.useContext(UserDataContext);

    async function Logout() {
      AsyncStorage.clear().then(() => {
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
        setUserData({});
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
              {/* <Foundation name="torso-business" size={30} color={theme.colors.text} /> */}
              {/* <Fontisto name="person" size={25} color="black" /> */}
              <StyledText
                style={{
                  fontSize: 25,
                }}
              >
                {userData?.name
                  ? userData?.name
                  : userData?.firstName +
                    " " +
                    userData?.lastName?.slice(0, 1) +
                    "."}
              </StyledText>
            </View>
          )}
        </View>

        {/* CUSTOMER TABS */}
        {userData?.firstName && (
          <Dw.Section
            showDivider={false}
            style={{ width: "100%", gap: 5, paddingLeft: 30 }}
          >
            {/* ORDERS */}
            <Dw.Item
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
            <Dw.Item
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
              onPress={() => navigation.navigate("wishlist")}
            />
            {/* PROFILE */}
            <Dw.Item
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
          </Dw.Section>
        )}

        {/* ACTIONS HEADER */}
        {/* <StyledText style={{ fontSize: 17.5, marginLeft:40, color: theme.colors.placeholder }}>
          ACTION MENU
        </StyledText> */}

        {/* SELLER TABS */}
        {userData?.name && (
          <Dw.Section
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
          </Dw.Section>
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
              options={MoveInFromCenter}
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
                      <Stack.Screen
                        name="customerProfile"
                        component={CustomerProfile}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="placedOrders"
                        component={PlacedOrders}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="productScreen"
                        component={ProductScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="categoryScreen"
                        component={CategoryScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="wishlist"
                        component={Wishlist}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="viewAllCategories"
                        component={ViewAllCategories}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="viewAllProducts"
                        component={ViewAllProducts}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="deliveryDetailsScreen"
                        component={DeliveryDetailsScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="checkoutScreen"
                        component={CheckoutScreen}
                        options={SlideFromRight}
                      />
                      <Stack.Screen
                        name="orderConfirmed"
                        component={OrderConfirmed}
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
