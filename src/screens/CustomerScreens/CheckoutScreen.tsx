import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import GetEstDeliveryDate from "../../utils/DeliveryEstimationData";
import { screenWidth } from "../../utils/Dimensions";
import { FormatPriceWithCommas } from "../../utils/PriceFormatter";
import { baseUrl } from "../../utils/localENV";

const CheckoutScreen = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const backgroundColor = "white";

  const { product, orderDetails } = route.params;

  const theme = useTheme<ThemeInterface>();

  const placeOrderQF = () => {
    return axios.post(baseUrl + `/order/createOrder`, orderDetails);
  };

  const { mutate, isLoading } = useMutation(placeOrderQF, {
    onSuccess: (data) => {
      navigation.navigate("orderConfirmed", {
        orderInfo: data.data,
      });
    },
  });

  function PlaceOrder() {
    mutate();
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          paddingHorizontal:
            Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <StatusBar animated={true} backgroundColor={backgroundColor} />

        {/* TOP BAR */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* BACK */}
          <BackButton />
        </View>

        {/* HEADER TEXT - ADD PROD */}
        <HeaderSection
          heading="Checkout"
          subHeading="Your desires, ready to be fulfilled!"
        />

        {/* YOUR PURCHASE  */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 0,
          }}
        >
          {/* SECTION HEADER */}
          <StyledText style={{ fontSize: 20 }}>Your Purchase</StyledText>
          <StyledText
            style={{ fontSize: 12.5, color: theme.colors.placeholder }}
          >
            Product details of your purchase.
          </StyledText>
          {/* CARD */}
          <View
            style={{
              padding: 10,
              width: "100%",
              display: "flex",
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              // borderWidth:2,
              // borderColor: theme.colors.background
              backgroundColor: theme.colors.background,
              marginVertical: 20,
            }}
          >
            <View style={{ width: "40%" }}>
              <Image
                style={{ width: 100, aspectRatio: 1, borderRadius: 5 }}
                source={{ uri: baseUrl + product?.productImage }}
              />
            </View>

            <View
              style={{
                width: "60%",
                height: 100,
                justifyContent: "space-between",
              }}
            >
              <StyledText style={{ fontSize: 17.5 }}>
                {product?.name}
              </StyledText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 10,
                }}
              >
                <StyledText
                  style={{ fontSize: 12.5, color: theme.colors.placeholder }}
                >
                  Quantity :
                </StyledText>
                <StyledText
                  style={{ fontSize: 15, color: theme.colors.primary }}
                >
                  1
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 10,
                }}
              >
                <StyledText
                  style={{ fontSize: 12.5, color: theme.colors.placeholder }}
                >
                  Discount :
                </StyledText>
                <StyledText style={{ fontSize: 15, color: theme.colors.error }}>
                  0%
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 15,
                }}
              >
                <StyledText style={{ fontSize: 15 }}>
                  ₹{" "}
                  {product?.price > 100000
                    ? product?.price.toString().substring(0, 2) + " lac"
                    : FormatPriceWithCommas(product?.price)}{" "}
                  x 1 =
                </StyledText>
                <StyledText
                  style={{ fontSize: 17.5, color: theme.colors.primary }}
                >
                  ₹{" "}
                  {product?.price > 100000
                    ? product?.price.toString().substring(0, 2) + " lac"
                    : FormatPriceWithCommas(product?.price)}
                </StyledText>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <MaterialIcons name="info" size={25} color={theme.colors.warning} />
            <StyledText style={{ fontSize: 12.5, color: theme.colors.text }}>
              Delivery charges will be added according to your location by the
              seller.
            </StyledText>
          </View>
        </View>

        {/* DELIVERY DETAILS  */}
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 10,
          }}
        >
          {/* SECTION HEADER */}
          <StyledText style={{ fontSize: 20 }}>Delivery Details</StyledText>
          <StyledText
            style={{ fontSize: 12.5, color: theme.colors.placeholder }}
          >
            Please note that delivery times may vary and should be expected
            within 7-10 days. We strive to ensure your order reaches you as
            quickly as possible. If there are any delays or changes to your
            delivery, we will notify you promptly. Thank you for your
            understanding and patience.
          </StyledText>
        </View>

        {/* DETAILS */}
        <View style={{ gap: 10 }}>
          {/* DELIVERY RADIUS */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText>Delivery Address :</StyledText>
            <StyledText style={{ fontSize: 15, color: theme.colors.info }}>
              {orderDetails?.shippingAddress}
            </StyledText>
          </View>
          {/* Cash on Delivery */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText>Expect Delivery By: </StyledText>
            <StyledText
              style={{
                fontSize: 15,
              }}
            >
              {GetEstDeliveryDate()}
            </StyledText>
          </View>
          {/* GT */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <StyledText style={{ fontSize: 20 }}>Grand Total: </StyledText>
            <StyledText
              style={{
                fontSize: 22.5,
                color: theme.colors.success,
              }}
            >
              ₹ {FormatPriceWithCommas(product?.price)}
            </StyledText>
          </View>
        </View>

        {/* CONTINUE BUTTON */}
        <StyledButton
          loading={isLoading}
          onPress={() => PlaceOrder()}
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
          Place Order
        </StyledButton>
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;
