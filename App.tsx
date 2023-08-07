import "react-native-gesture-handler";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StatusBarHeight } from "./src/utils/StatusbarHeight";
import { useFonts } from "expo-font";
import * as SplashLoading from "expo-splash-screen";
import { theme } from "./src/styles/theme";
import MainStack from "./src/navigation/MainStack";

export default function App() {
  const [fontsLoaded] = useFonts({
    InterMedium: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (fontsLoaded) {
    SplashLoading.hideAsync();
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, paddingTop: StatusBarHeight }}>
        <MainStack />
      </View>
    </PaperProvider>
  );
}
