import { View, Image, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import AddProductButton from "../../components/AddProductButton";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { ThemeInterface } from "../../styles/theme";
import { Text, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { baseUrl } from "../../utils/localENV";
import { screenWidth } from "../../utils/Dimensions";
import StyledText from "../../styles/styledComponents/StyledText";
import axios from "axios";
import { FormatPriceWithCommas } from "../../utils/PriceFormatter";

const ProductScreen = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const product = route.params.props;
  const theme = useTheme<ThemeInterface>();
  const backgroundColor = "white";

  const [catName, setCatName] = React.useState();

  React.useEffect(() => {
    axios
      .get(baseUrl + `/category/getCategoryById/${product?.category}`)
      .then((res) => setCatName(res.data.name));
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          gap: 25,
          marginBottom:50
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

          {/* ADD PRODUCT */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // paddingLeft: 20,
              marginTop: 10,
            }}
          >
            <AntDesign
              name="edit"
              style={{
                padding: 12.5,
                borderRadius: 5,
                backgroundColor: theme.colors.background,
              }}
              size={25}
              color={theme.colors.placeholder}
            />
          </TouchableOpacity>
        </View>

        {/* IMAGE SECTION */}
        <Animated.Image
          style={{
            width: screenWidth,
            height: 400,
            alignSelf: "center",
            marginTop: 25,
          }}
          source={{ uri: baseUrl + product.productImage }}
        />

        {/* IMAGE HEADER DETAILS */}
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* NAME & CAT */}
          <View
            style={{
              width: "70%",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <StyledText style={{ color: theme.colors.placeholder }}>
              {catName}
            </StyledText>
            <StyledText style={{ fontSize: 25 }}>{product.name}</StyledText>
          </View>
          {/* PRICE */}
          <View
            style={{
              width: "30%",
              gap: 5,
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <StyledText style={{ color: theme.colors.placeholder }}>
              Price
            </StyledText>
            <StyledText style={{ fontSize: 20 }}>
              ₹ {FormatPriceWithCommas(product.price)}
            </StyledText>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <StyledText>Description</StyledText>
          <StyledText style={{ color: theme.colors.placeholder }}>
            {product.description}
          </StyledText>
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
      </View>
    </ScrollView>
  );
};

export default ProductScreen;