import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import axios from "axios";
import { baseUrl } from "../utils/localENV";
import { useQuery } from "@tanstack/react-query";
import { ThemeInterface } from "../styles/theme";
import { ActivityIndicator, useTheme } from "react-native-paper";
import StyledText from "../styles/styledComponents/StyledText";
import ReturnProdCategory from "./ReturnProdCategory";
import { useNavigation } from "@react-navigation/native";

const OrderedProduct = ({ product: order }: any) => {
  const [prod, setProd] = React.useState<any>();

  const navigation = useNavigation();

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

  const theme = useTheme<ThemeInterface>();

  if (isLoading) {
    <ActivityIndicator size={50} />;
  } else {
    return (
      <TouchableOpacity
        //   @ts-ignore
        onPress={() => navigation.navigate("productScreen", { props: prod })}
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
              Arriving: {order?.deliveryTime}
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
            <StyledText style={{ fontSize: 12.5, color: theme.colors.warning }}>
              {order?.orderStatus}
            </StyledText>

            <StyledText style={{ fontSize: 17.5 }}>₹ {prod?.price}</StyledText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default OrderedProduct;
