import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { BounceInUp } from "react-native-reanimated";
import StyledText from "../../styles/styledComponents/StyledText";
import { useTheme } from "react-native-paper";
import { ThemeInterface } from "../../styles/theme";
import StyledButton from "../../styles/styledComponents/StyledButton";
import { screenWidth } from "../../utils/Dimensions";

const OrderConfirmed = ({ navigation, route }: any) => {
  const theme = useTheme<ThemeInterface>();
  const backgroundColor = "white";

  const { orderInfo } = route.params;
  console.log(orderInfo);

  return (
    // CONTAINER BODY
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
        paddingVertical: 10,
        gap: 50,
        backgroundColor,
      }}
    >
      <StatusBar animated={true} backgroundColor={backgroundColor} />

      {/* IMAGE */}
      <View style={{ marginTop: 100 }}>
        <Animated.Image
          entering={BounceInUp}
          style={{ width: 250, height: 350 }}
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
            fontSize: 12.5,
            textAlign: "center",
            fontFamily: "InterBold",
          }}
        >
          Order Id
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            fontFamily: "InterBold",
            color: "blueviolet",
          }}
        >
          {orderInfo?.id}
        </Text>
        <StyledText style={{ fontSize: 12.5, textAlign: "center" }}>
          Your order has been confirmed, we will send you confirmation email
          shortly.
        </StyledText>
      </View>

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
  );
};

export default OrderConfirmed;