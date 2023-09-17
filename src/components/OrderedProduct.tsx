import { View, Image, Platform, TouchableOpacity, Linking } from "react-native";
import React from "react";
import axios from "axios";
import { baseUrl } from "../utils/localENV";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThemeInterface } from "../styles/theme";
import { ActivityIndicator, useTheme } from "react-native-paper";
import StyledText from "../styles/styledComponents/StyledText";
import ReturnProdCategory from "./ReturnProdCategory";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import StyledButton from "../styles/styledComponents/StyledButton";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { UserDataContext } from "../context/UserDataContext";
import { FormatPriceWithCommas } from "../utils/PriceFormatter";
import { SnackStateProps } from "../types/SnackbarTypes";
import { SnackbarContext } from "../context/SnackbarContext";

const OrderedProduct = ({ product: order, index }: any) => {
  const [prod, setProd] = React.useState<any>();
  const [customer, setCustomer] = React.useState<any>();
  const [mSale, setMSale] = React.useState<any>();

  const navigation = useNavigation<any>();

  const { snackData, setSnackData }: SnackStateProps =
    React.useContext(SnackbarContext);

  const { userData, setUserData }: any = React.useContext(UserDataContext);

  const placeOrderQF = () => {
    // console.log(baseUrl + `/product/getProduct/${order?.productId}`);
    return axios.get(baseUrl + `/product/getProduct/${order?.productId}`);
  };

  const { isLoading } = useQuery(
    [`Ordered Product ${order?.productId}`],
    placeOrderQF,
    {
      onSuccess: (data) => {
        setProd(data.data);
        //   console.log("Product Details -> ", data.data);
      },
    }
  );

  const getCustomer = () => {
    // console.log(baseUrl + `/customer/getCustomer/${order?.customerId}`);
    return axios.get(baseUrl + `/customer/getCustomer/${order?.customerId}`);
  };

  const { isLoading: custLoading } = useQuery(
    [`Customer - ${order?.customerId}`],
    getCustomer,
    {
      onSuccess: (data) => {
        setCustomer(data.data);
        // console.log("Customer Details -> ", data.data);
      },
    }
  );

  const addToMontlhySales = () => {
    const MSData = {
      totalSales: prod?.price,
    };
    return axios.put(
      baseUrl + `/monthSales/editMonthSales/${userData?.id}`,
      MSData
    );
  };

  const { mutate: addToMonthMutation, data } = useMutation(addToMontlhySales, {
    onSuccess: (data) => {
      setMSale(data.data);
      // console.log("MontlySales Details -> ", data.data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  // UPDATE PROD ORDER STATUS
  const changeProdStatus = () => {
    const changePSData = {
      orderStatus: "Complete",
    };
    // console.log(baseUrl + `/order/editOrder/${order?.id}`);
    return axios.put(baseUrl + `/order/editOrder/${order?.id}`, changePSData);
  };

  const { mutate: changeProdStatusMutation } = useMutation(changeProdStatus, {
    onSuccess: (data) => {
      setMSale(data.data);
      console.log("Order Status Details -> ", data.data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const theme = useTheme<ThemeInterface>();

  function HandleMarkComplete() {
    addToMonthMutation();
    changeProdStatusMutation();
    setSnackData({
      open: true,
      severity: "Success",
      text: "Order Completed!",
    });
    navigation.navigate("totalSales", { mSale });
  }

  if (isLoading) {
    <ActivityIndicator size={50} />;
  } else {
    return (
      <Animated.View
        style={{ padding: 12.5, width: "100%" }}
        entering={FadeInUp.delay(index * 100)}
        exiting={FadeOut}
        layout={Layout.delay(250)}
      >
        {/* PROD DETAILS */}
        <TouchableOpacity
          //   @ts-ignore
          onPress={() => navigation.navigate("productScreen", { props: prod })}
          style={{
            display: "flex",
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: Platform.OS === "web" ? 25 : 5
            // borderWidth:2,
            // borderColor: theme.colors.background
            //   backgroundColor: theme.colors.info,
          }}
        >
          <View style={{ width: "40%" }}>
            <Image
              style={{ width: 100, aspectRatio: 1, borderRadius: 2.5 }}
              source={{ uri: baseUrl + prod?.productImage }}
            />
          </View>

          <View
            style={{
              width: "60%",
              height: 100,
              justifyContent: "space-between",
            }}
          >
            <StyledText style={{ fontSize: 15 }}>{prod?.name}</StyledText>

            {/* LINE 3 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <StyledText style={{ fontSize: 12.5 }}>
                {userData?.firstName ? "Arriving:" : "Deliver by: "}{" "}
                {order?.deliveryTime}
              </StyledText>
            </View>
            {/* LINE 3 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <StyledText style={{ fontSize: 12.5 }}>
                To: {order?.shippingAddress}
              </StyledText>
            </View>
            {/* L4 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* DELIVERED */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 5,
                }}
              >
                {order?.orderStatus === "Complete" ? 
                <Ionicons name="checkmark-done" size={17.5} color={theme.colors.success} />
                : <MaterialCommunityIcons name="truck-delivery" size={17.5} color={theme.colors.warning} />}
                <StyledText
                  style={{
                    fontSize: 12.5,
                    color:
                      order?.orderStatus === "Incomplete"
                        ? theme.colors.warning
                        : theme.colors.success,
                  }}
                >
                  {order?.orderStatus === "Complete" ? "Delivered" : "Incomplete"}
                </StyledText>
              </View>

              <StyledText style={{ fontSize: 17.5 }}>
                ₹ {FormatPriceWithCommas(prod?.price)}
              </StyledText>
            </View>
          </View>
        </TouchableOpacity>

        {/* CALL CUSTOMER */}
        {userData?.name && (
          <View
            style={{
              width: "100%",
              paddingVertical: 15,
              // alignItems: "flex-end",
              // justifyContent: "flex-end",
            }}
          >
            <StyledButton
              onPress={() => {
                Linking.openURL(`tel:${customer?.phone}`);
              }}
              mode="contained"
              style={{ backgroundColor: theme.colors.success }}
              icon={() => (
                <Feather
                  onPress={() => console.log("call customer")}
                  style={{ marginRight: 10 }}
                  name="phone-call"
                  size={20}
                  color={theme.colors.background}
                />
              )}
            >
              Call Customer
            </StyledButton>
          </View>
        )}

        {/* MARK COMPLETE BUTTON  */}
        {userData?.name && (
          <View style={{ width: "100%" }}>
            <StyledButton
              style={{ backgroundColor: theme.colors.info }}
              icon={() => (
                <Feather
                  name="check-circle"
                  style={{ marginRight: 10 }}
                  size={20}
                  color={theme.colors.background}
                />
              )}
              onPress={() => {
                // if montly sales model of the current month exists then add the price of the prod to its monthlySales
                // if not, then make a model in the backend and add the prod price to its monthlySales
                HandleMarkComplete();
              }}
              mode="contained"
            >
              Mark Completed
            </StyledButton>
          </View>
        )}
      </Animated.View>
    );
  }
};

export default OrderedProduct;
