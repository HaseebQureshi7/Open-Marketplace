import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserDataContext } from "../../context/UserDataContext";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { SnackStateProps } from "../../types/SnackbarTypes";
import GetEstDeliveryDate from "../../utils/DeliveryEstimationData";
import { screenWidth } from "../../utils/Dimensions";
import { FormatPriceWithCommas } from "../../utils/PriceFormatter";
import { baseUrl } from "../../utils/localENV";

const DeliveryDetailsScreen = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const backgroundColor = "white";
  const product = route.params.params;
  const theme = useTheme<ThemeInterface>();
  const { userData, setUserData }: any = React.useContext(UserDataContext);

  const { snackData, setSnackData }: SnackStateProps =
    React.useContext(SnackbarContext);
  const [deliveryAddress, setdeliveryAddress] = React.useState<string>("");
  const [pincode, setPincode] = React.useState<string>("");

  function HandleSubmit() {
    if (deliveryAddress.length > 2) {
      if (pincode.length > 3) {
        const orderData = {
          customerId: userData?.id,
          businessId: product?.sellerId,
          productId: product?.id,
          quantity: `${1}`,
          deliveryTime: GetEstDeliveryDate(),
          shippingAddress: deliveryAddress,
          pinCode: parseInt(pincode),
          orderStatus: "Incomplete",
          cashOnDelivery: product?.cashOnDelivery,
          isReturnable: product?.isReturnable,
        };


        navigation.navigate("checkoutScreen", {
          product,
          orderDetails: orderData,
        });
      } else {
        setSnackData({
          open: true,
          severity: "Warning",
          text: "Invalid Pincode",
        });
      }
    } else {
      setSnackData({
        open: true,
        severity: "Warning",
        text: "Invalid Address",
      });
    }
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
          heading="Delivery Details"
          subHeading="Add your order and delivery details"
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
          {/* DELIVERY CHARGES WARNING */}
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

        {/* YOUR ADDRESS + PINCODE */}
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // gap: 20,
          }}
        >
          {/* SECTION HEADER */}
          <StyledText style={{ fontSize: 20 }}>Your Address</StyledText>
          <StyledText
            style={{
              fontSize: 12.5,
              color: theme.colors.placeholder,
              marginBottom: 20,
            }}
          >
            Add details for your delivery address.
          </StyledText>
          {/* ADDRESS INPUT */}
          <View
            style={{
              width: "100%",
              display: "flex",
              gap: 5,
            }}
          >
            <TextInput
              style={{ width: "100%", height: 60, backgroundColor }}
              outlineStyle={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.colors.disabled,
              }}
              left={
                <TextInput.Icon
                  style={{ paddingTop: 10 }}
                  icon={() => (
                    <MaterialIcons
                      name="house"
                      size={24}
                      color={theme.colors.placeholder}
                    />
                  )}
                />
              }
              label="Delivery Address"
              placeholder="Rawalpora, Wanbval"
              value={deliveryAddress}
              mode="outlined"
              onChangeText={(text) => setdeliveryAddress(text)}
            />
            {/* PINCODE INPUT */}
            <TextInput
              inputMode="numeric"
              style={{ width: "100%", height: 60, backgroundColor }}
              outlineStyle={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.colors.disabled,
              }}
              left={
                <TextInput.Icon
                  style={{ paddingTop: 10 }}
                  icon={() => (
                    <MaterialIcons
                      name="fiber-pin"
                      size={24}
                      color={theme.colors.placeholder}
                    />
                  )}
                />
              }
              label="Pincode"
              placeholder="190005"
              value={pincode}
              mode="outlined"
              onChangeText={(text) => setPincode(text)}
            />
          </View>
        </View>

        {/* OPTIONS */}
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
            <StyledText>Delivery Radius</StyledText>
            <StyledText style={{ fontSize: 15, color: theme.colors.info }}>
              {product.deliveryRadius}
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
            <StyledText>Cash on Delivery</StyledText>
            <StyledText
              style={{
                fontSize: 15,
                color: product.cashOnDelivery
                  ? theme.colors.info
                  : theme.colors.error,
              }}
            >
              {product.cashOnDelivery ? "Yes" : "No"}
            </StyledText>
          </View>
          {/* Returnable */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText>Returnable</StyledText>
            <StyledText
              style={{
                fontSize: 15,
                color: product.returnable
                  ? theme.colors.info
                  : theme.colors.error,
              }}
            >
              {product.returnable ? "Yes" : "No"}
            </StyledText>
          </View>
        </View>

        {/* CONTINUE BUTTON */}
        <StyledButton
          onPress={() => HandleSubmit()}
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
          Continue
        </StyledButton>
      </View>
    </ScrollView>
  );
};

export default DeliveryDetailsScreen;
