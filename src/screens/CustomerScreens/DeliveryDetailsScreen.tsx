import {
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { ThemeInterface, theme } from "../../styles/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import StyledText from "../../styles/styledComponents/StyledText";
import { baseUrl } from "../../utils/localENV";
import { TextInput, useTheme } from "react-native-paper";
import StyledButton from "../../styles/styledComponents/StyledButton";
import { screenWidth } from "../../utils/Dimensions";
import { StatusBar } from "expo-status-bar";
import { UserDataContext } from "../../context/UserDataContext";
import GetEstDeliveryDate from "../../utils/DeliveryEstimationData";
import { SnackbarContext } from "../../context/SnackbarContext";
import { SnackStateProps } from "../../types/SnackbarTypes";

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

        console.log(orderData);

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
            gap: 20,
          }}
        >
          {/* SECTION HEADER */}
          <StyledText style={{ fontSize: 20 }}>Your Purchase</StyledText>
          {/* CARD */}
          <View
            style={{
              padding: 12.5,
              width: "100%",
              display: "flex",
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              // borderWidth:2,
              // borderColor: theme.colors.background
              backgroundColor: theme.colors.info,
            }}
          >
            <View style={{ width: "40%" }}>
              <Image
                style={{ width: 100, aspectRatio: 1, borderRadius: 2.5 }}
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
              <StyledText style={{ fontSize: 15, color: "white" }}>
                {product?.name}
              </StyledText>
              <StyledText style={{ fontSize: 12.5, color: "white" }}>
                Quantity : 1
              </StyledText>
              <StyledText style={{ fontSize: 15, color: "white" }}>
                ₹ {product?.price} x 1 = ₹ {product?.price}
              </StyledText>
            </View>
          </View>
        </View>

        {/* YOUR ADDRESS  */}
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          {/* SECTION HEADER */}
          <StyledText style={{ fontSize: 20 }}>Your Address</StyledText>
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
