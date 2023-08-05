import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Splash from "./src/screens/Splash";
import Welcome1 from "./src/screens/Welcome1";
import Welcome2 from "./src/screens/Welcome2";
import Welcome3 from "./src/screens/Welcome3";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { StatusBarHeight } from "./src/utils/StatusbarHeight";
import { useFonts } from "expo-font";
import * as SplashLoading from "expo-splash-screen";
import { theme } from "./src/styles/theme";

export default function App() {
  const Stack = createStackNavigator();

  const MoveInFromBottom = {
    gestureEnabled: true,
    headerShown: false,
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };

  const SlideFromRight = {
    ...TransitionPresets.SlideFromRightIOS, // Apply default slide animation
    headerShown: false,
    // Add any other options specific to the custom screens
  };

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
        <NavigationContainer>
          <Stack.Navigator screenOptions={SlideFromRight}>
            <Stack.Screen
              name="splash"
              component={Splash}
              options={MoveInFromBottom}
            />
            <Stack.Screen
              name="welcome1"
              component={Welcome1}
              options={MoveInFromBottom}
            />
            <Stack.Screen
              name="welcome2"
              component={Welcome2}
              options={SlideFromRight}
            />
            <Stack.Screen
              name="welcome3"
              component={Welcome3}
              options={SlideFromRight}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
