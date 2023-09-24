import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, { BounceInUp } from "react-native-reanimated";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { screenWidth } from "../../utils/Dimensions";

const OrderConfirmed = ({ navigation, route }: any) => {
  const theme = useTheme<ThemeInterface>();
  const backgroundColor = "white";

  const { orderInfo } = route.params;

  return (
    // CONTAINER BODY
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
        paddingVertical: 10,
        gap: 40,
        backgroundColor,
      }}
    >
      <StatusBar animated={true} backgroundColor={backgroundColor} />

      {/* IMAGE */}
      <View style={{ marginTop: 75 }}>
        <Animated.Image
          entering={BounceInUp}
          style={{ width: 225, height: 300 }}
          source={require("../../../assets/images/orderComplete.png")}
        />
      </View>

      {/* TEXT */}
      <View style={{ alignItems: "center", gap: 10 }}>
        <Text
          style={{ fontSize: 30, textAlign: "center", fontFamily: "InterBold" }}
        >
          Order Confirmed
        </Text>
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            fontFamily: "InterBold",
            color: theme.colors.info,
          }}
        >
          Order Id: {orderInfo?.id}
        </Text>
        <StyledText style={{ fontSize: 12.5, textAlign: "center" }}>
          Your order has been confirmed 🎉 we will send you confirmation email
          shortly.
        </StyledText>
      </View>

      <View>
        <StyledButton
          onPress={() => navigation.navigate("placedOrders")}
          textColor={backgroundColor}
          style={{
            backgroundColor: theme.colors.info,
            width: screenWidth,
            alignSelf: "center",
            borderRadius: 0,
            marginBottom: 5,
          }}
          contentStyle={{ padding: 10 }}
        >
          Go to Orders
        </StyledButton>
        <StyledButton
          onPress={() => navigation.navigate("dashboard")}
          textColor={backgroundColor}
          style={{
            backgroundColor: theme.colors.accent,
            width: screenWidth,
            alignSelf: "center",
            borderRadius: 0,
            marginBottom: 25,
          }}
          contentStyle={{ padding: 10 }}
        >
          Continue Shopping
        </StyledButton>
      </View>
    </View>
  );
};

export default OrderConfirmed;
