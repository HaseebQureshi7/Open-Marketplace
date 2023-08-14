import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutDown,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
// import { AppColors } from "../styles/GlobalSyles";
import StyledText from "../styles/styledComponents/StyledText";
// import AddToWishlist from "../utils/AddToWishlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { WishlistContext } from "../context/WishlistContext";
import { SnackbarContext } from "../context/SnackbarContext";
import {SnackbarTypes} from "../types/SnackbarTypes";
import { screenHeight, screenWidth } from "../utils/Dimensions";
import { baseUrl } from './../utils/localENV';

const ProductCard = ({ props }: any) => {
  const { data, index, navigation } = props;

  interface SnackbarProps {
    setSnackbarData: (snackbarData: SnackbarTypes) => void;
  }

//   const { setSnackbarData }: SnackbarProps = useContext(SnackbarDataContext);

//   const { wishlist, setWishlist } = useContext(WishlistContext);

  const transformValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: transformValue.value }],
    };
  });

//   const HandleFavoritePress = (event: any, id: any) => {
//     event.stopPropagation();
//     transformValue.value = withRepeat(withSpring(1.4), 2, true);
//     if (wishlist != null && wishlist.includes(id)) {
//       setWishlist((prevState: any) =>
//         prevState.filter((data: any) => data != id)
//       );
//       setSnackbarData({
//         open: true,
//         message: "Removed from Wishlist",
//         severity: "Info",
//       });
//     } else {
//       setWishlist((prevState: any) => [...prevState, id]);
//       setSnackbarData({
//         open: true,
//         message: "Added to your Wishlist",
//         severity: "Success",
//       });
//     }
//   };

  return (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      layout={Layout.delay(250)}
      style={[
        {
          width: Platform.OS === "web" ? (screenWidth / 100) * 25 : "47.5%",
          height: Platform.OS === "web" ? (screenWidth / 100) * 25 : "75%",
          aspectRatio: 0.75,
          borderRadius: 10,
          // backgroundColor:"red"
        },
      ]}
      // onTouchEnd={() => {
      //   navigation.navigate("Product", { params: data });
      // }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Product", { params: data });
        }}
      >
        {/* WISHLIST ICON */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              right: 0,
              padding: 5,
              zIndex: 1,
            },
            animatedStyle,
          ]}
        >
          <MaterialIcons
            onPress={(e) => {
            //   HandleFavoritePress(e, data?.id);
              console.log("IDP -> ", data?.id);
            //   AddToWishlist(data?.id);
            }}
            // name={wishlist?.includes(data?.id) ? "favorite" : "favorite-border"}
            name={"favorite-border"}
            size={24}
            color={
            //   wishlist?.includes(data?.id) ? AppColors.error : AppColors.bgLight
            "red"
            }
            // color={AppColors.bgLight}
          />
        </Animated.View>
        <Image
          style={{
            width: "100%",
            height: Platform.OS === "web" ? (screenWidth / 100) * 25 : "75%",
            borderRadius: 10,
          }}
          source={{
            uri: baseUrl + data?.productImage,
          }}
        />
        <View style={{ padding: 5 }}>
          <StyledText style={{ fontSize: 12.5 }}>{data?.name}</StyledText>
          <Text style={{ fontSize: 12.5, fontFamily: "InterBold" }}>
            ${data?.price}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductCard;
