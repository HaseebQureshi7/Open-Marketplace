import { View, Text, TouchableOpacity } from "react-native";
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

interface ProdCardTypes {
  prod: any;
  index: number;
}

const ProductCard = ({ prod, index }: ProdCardTypes) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const theme = useTheme<ThemeInterface>();

  return (
    <Animated.View
      key={prod.id}
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      layout={Layout.delay(250)}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("productScreen", { props: prod })}
        style={{ alignItems: "flex-start", gap: 5 }}
      >
        <MaterialIcons
          style={{
            position: "absolute",
            zIndex: 1,
            right: 5,
            top: 5,
          }}
          // onPress={(e) => {
          //   HandleFavoritePress(e, data?.id);
          //   console.log("IDP -> ", data?.id);
          //   AddToWishlist(data?.id);
          // }}
          name={
            "favorite-border"
            // wishlist?.includes(data?.id)
            //   ? "favorite"
            //   : "favorite-border"
          }
          size={24}
          color={
            "white"
            // wishlist?.includes(data?.id)
            //   ? AppColors.error
            //   : AppColors.bgLight
          }
          // color={AppColors.bgLight}
        />
        <Animated.Image
          exiting={FadeInDown}
          style={{ width: 150, height: 150, borderRadius: 10 }}
          source={{
            uri: baseUrl + prod.productImage,
          }}
        />
        <StyledText>{prod.name}</StyledText>
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
