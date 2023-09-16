import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashLoading from "expo-splash-screen";
import { theme } from "./src/styles/theme";
import MainStack from "./src/navigation/MainStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarContext } from "./src/context/SnackbarContext";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDataContext } from "./src/context/UserDataContext";
import { GetUserType } from "./src/utils/GetUserType";
import { GetBusinessFromLS, GetCustomerFromLS } from "./src/utils/SaveUserToLS";
import { SnackbarTypes } from "./src/types/SnackbarTypes";
import Snackbar from "./src/components/Snackbar";
import { UserTokenContext } from "./src/context/UserTokenContext";
import { GetTokenFromLS } from "./src/utils/AuthTokenHandler";
import { WishlistContext } from "./src/context/WishlistContext";
import { GetWishlist } from "./src/utils/WishlistFunction";

export default function App() {
  const [fontsLoaded] = useFonts({
    InterMedium: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  const queryClient = new QueryClient();

  const [snackData, setSnackData] = React.useState<SnackbarTypes>({
    text: "",
    open: false,
    severity: "Success",
  });

  const [userData, setUserData] = React.useState<any>();
  const [userToken, setUserToken] = React.useState<any>();
  const [wishlistItems, setWishlistItems] = React.useState<any>();

  React.useEffect(() => {
    GetWishlist().then((res) => setWishlistItems(res));

    GetUserType().then((res) =>
      res === "Business"
        ? GetBusinessFromLS().then((res) => setUserData(res))
        : res === "Customer"
        ? GetCustomerFromLS().then((res) => setUserData(res))
        : null
    );
    GetTokenFromLS().then((res) => setUserToken(res));
  }, []);

  if (fontsLoaded) {
    SplashLoading.hideAsync();
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserTokenContext.Provider value={{ userToken, setUserToken }}>
        <WishlistContext.Provider value={{ wishlistItems, setWishlistItems }}>
          <UserDataContext.Provider value={{ userData, setUserData }}>
            <SnackbarContext.Provider value={{ snackData, setSnackData }}>
              <PaperProvider theme={theme}>
                <SafeAreaView style={{ flex: 1 }}>
                  <MainStack />
                  <Snackbar snackData={snackData} />
                </SafeAreaView>
              </PaperProvider>
            </SnackbarContext.Provider>
          </UserDataContext.Provider>
        </WishlistContext.Provider>
      </UserTokenContext.Provider>
    </QueryClientProvider>
  );
}
