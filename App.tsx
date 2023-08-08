import "react-native-gesture-handler";
import { PaperProvider, Snackbar } from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashLoading from "expo-splash-screen";
import { theme } from "./src/styles/theme";
import MainStack from "./src/navigation/MainStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarContext } from "./src/context/SnackbarContext";
import React from "react";
import { snackDataTypes } from "./src/types/SnackDataTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [fontsLoaded] = useFonts({
    InterMedium: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  const queryClient = new QueryClient();

  const [snackData, setSnackData] = React.useState<snackDataTypes>({
    text: "",
    open: false,
  });

  if (fontsLoaded) {
    SplashLoading.hideAsync();
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarContext.Provider value={{ snackData, setSnackData }}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={{ flex: 1 }}>
            <MainStack />
            <Snackbar
              style={{ backgroundColor: "#070707", marginBottom: 10 }}
              visible={snackData.open}
              duration={4000}
              onDismiss={() =>
                setSnackData({
                  open: false,
                })
              }
              action={{
                label: "Dismiss",
                onPress: () => {
                  setSnackData({
                    open: false,
                  });
                },
              }}
            >
              {snackData.text}
            </Snackbar>
          </SafeAreaView>
        </PaperProvider>
      </SnackbarContext.Provider>
    </QueryClientProvider>
  );
}
