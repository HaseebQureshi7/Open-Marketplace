import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  FadeInDown,
} from "react-native-reanimated";
import StyledText from "../styles/styledComponents/StyledText";
import { baseUrl } from "../utils/localENV";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FormatPriceWithCommas } from "../utils/PriceFormatter";
import ReturnProdCategory from "./ReturnProdCategory";
import { ThemeInterface } from "../styles/theme";
import { useTheme } from "react-native-paper";
import { screenWidth } from "../utils/Dimensions";
import { WishlistContext } from "../context/WishlistContext";
import {
  isLandscape,
  isLandscapeWide,
  screenSize,
} from "../utils/ResponsiveUtils";

interface ProdCardTypes {
  prod: any;
  index: number;
}

const ProductCard = ({ prod, index }: ProdCardTypes) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const theme = useTheme<ThemeInterface>();

  const { wishlistItems, setWishlistItems }: any =
    React.useContext(WishlistContext);

  function IsProductInWishlist(
    wishlistItems: any[],
    productId: string
  ): boolean {
    return wishlistItems.some((data: any) => data.id === productId);
  }

  return (
    <Animated.View
      style={{
        width:
          screenSize === "ultraWide"
            ? (screenWidth / 100) * 15
            : screenSize === "wide"
            ? (screenWidth / 100) * 25
            : (screenWidth / 100) * 40,
        // height: (screenWidth / 100) * 33,
      }}
      key={prod.id}
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      layout={Layout.delay(250)}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("productScreen", { props: prod })}
        style={{ alignItems: "flex-start", gap: 5 }}
      >
        {/* WISHLIST ICON */}
        {IsProductInWishlist(wishlistItems, prod?.id) && (
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                right: 0,
                padding: 7.5,
                zIndex: 1,
              },
            ]}
          >
            <MaterialIcons
              name={"favorite"}
              size={25}
              color={theme.colors.notification}
            />
          </Animated.View>
        )}

        {/* PROD IMAGE */}
        <Animated.Image
          exiting={FadeInDown}
          style={{
            width:
              screenSize === "ultraWide"
                ? (screenWidth / 100) * 15
                : screenSize === "wide"
                ? (screenWidth / 100) * 25
                : (screenWidth / 100) * 40,
            height:
              screenSize === "ultraWide"
                ? (screenWidth / 100) * 15
                : screenSize === "wide"
                ? (screenWidth / 100) * 25
                : (screenWidth / 100) * 40,
            borderRadius: 10,
          }}
          source={{
            uri: baseUrl + prod.productImage,
          }}
        />
        <StyledText style={{ width: "90%" }}>{prod.name}</StyledText>
        <View
          style={{
            flexDirection: "row",
            width: 150,
            justifyContent: "space-between",
          }}
        >
          {/* <StyledText style={{ fontSize: 12.5, color:theme.colors.placeholder }}>
            <ReturnProdCategory category={prod?.category} />
          </StyledText> */}
          <StyledText style={{ fontSize: 12.5 }}>
            ₹ {FormatPriceWithCommas(prod.price)}
          </StyledText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductCard;
