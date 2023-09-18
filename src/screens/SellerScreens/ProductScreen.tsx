import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import BackButton from "../../components/BackButton";
import ReturnProdCategory from "../../components/ReturnProdCategory";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserDataContext } from "../../context/UserDataContext";
import { WishlistContext } from "../../context/WishlistContext";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { SnackStateProps } from "../../types/SnackbarTypes";
import { screenWidth } from "../../utils/Dimensions";
import { FormatPriceWithCommas } from "../../utils/PriceFormatter";
import {
  AddToWishlist,
  RemoveFromWishlist,
} from "../../utils/WishlistFunction";
import { baseUrl } from "../../utils/localENV";

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

  const { userData, setUserData }: any = React.useContext(UserDataContext);
  const { wishlistItems, setWishlistItems }: any =
    React.useContext(WishlistContext);

  function IsProductInWishlist(
    wishlistItems: any[],
    productId: string
  ): boolean {
    return wishlistItems.some((data: any) => data.id === productId);
  }

  function HandleAddToWishlist() {
    AddToWishlist(product);
    setWishlistItems((prevItems: any) => [...prevItems, product]);
    setSnackData({
      open: true,
      severity: "Success",
      text: "Added to Wishlist!",
    });
  }

  function HandleRemoveFromWishlist() {
    RemoveFromWishlist(product?.id);
    setWishlistItems((prevItems: any) => {
      return prevItems.filter((item: any) => item.id !== product?.id);
    });
    setSnackData({
      open: true,
      severity: "Info",
      text: "Removed from Wishlist!",
    });
  }

  const queryClient = useQueryClient();

  const { snackData, setSnackData }: SnackStateProps =
    useContext(SnackbarContext);

  const deleteProdQuery = () => {
    return axios.delete(baseUrl + `/product/removeProduct/${product?.id}`);
  };

  const { mutate, isLoading } = useMutation(deleteProdQuery, {
    onSuccess: () => {
      setSnackData({
        open: true,
        severity: "Success",
        text: "Product Removed!",
      });
      queryClient
        .invalidateQueries(["All Business Products"])
        .then(() => navigation.navigate("dashboard"))
        .catch((e) => console.log(e));
    },
    onError: (e) => {
      setSnackData({
        open: true,
        severity: "Error",
        text: "Something went wrong!",
      });
    },
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal:
            Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
          gap: 25,
          marginBottom: 25,
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

          {/* DELETE PRODUCT / WISHLIST */}
          {userData?.name ? (
            <TouchableOpacity
              onPress={() => mutate()}
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
                // paddingLeft: 20,
                marginTop: 10,
              }}
            >
              {!isLoading ? (
                <MaterialIcons
                  name="delete-outline"
                  style={{
                    padding: 12.5,
                    borderRadius: 5,
                    backgroundColor: theme.colors.error,
                  }}
                  size={25}
                  color={theme.colors.background}
                />
              ) : (
                <View
                  style={{
                    padding: 12.5,
                    borderRadius: 5,
                    backgroundColor: theme.colors.error,
                  }}
                >
                  <ActivityIndicator
                    color={theme.colors.background}
                    size={25}
                  />
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                IsProductInWishlist(wishlistItems, product?.id)
                  ? HandleRemoveFromWishlist()
                  : HandleAddToWishlist();
              }}
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
                // paddingLeft: 20,
                marginTop: 10,
              }}
            >
              <AntDesign
                name="heart"
                style={{
                  padding: 15,
                  borderRadius: 5,
                  backgroundColor: theme.colors.background,
                }}
                size={20}
                color={
                  IsProductInWishlist(wishlistItems, product?.id)
                    ? theme.colors.notification
                    : theme.colors.placeholder
                }
              />
            </TouchableOpacity>
          )}
        </View>

        {/* IMAGE SECTION */}
        <Animated.Image
          style={{
            width:
              Platform.OS === "web" ? (screenWidth / 100) * 75 : screenWidth,
            height: Platform.OS === "web" ? (screenWidth / 100) * 40 : 400,
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
              <ReturnProdCategory category={product?.category} />
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
            <StyledText style={{ fontSize: product.price > 100000 ? 15 : 20 }}>
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
          {/* AVAILABLE UNITS */}
          {userData?.name && (
            <View
              style={{
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <StyledText>Available Units</StyledText>
              <StyledText style={{ fontSize: 15, color: theme.colors.text }}>
                {product?.availableUnits} Units
              </StyledText>
            </View>
          )}
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

        {/* BUY NOW */}
        {userData?.firstName ? (
          <View
            style={{
              width: screenWidth,
              alignSelf: "center",
              marginTop: 25,
              backgroundColor: theme.colors.accent,
            }}
          >
            <StyledButton
              onPress={() =>
                navigation.navigate("deliveryDetailsScreen", {
                  params: product,
                })
              }
              textColor={backgroundColor}
              style={{ backgroundColor: theme.colors.accent }}
              contentStyle={{ padding: 10 }}
            >
              Buy Now
            </StyledButton>
          </View>
        ) : (
          <View
            style={{
              width: screenWidth,
              alignSelf: "center",
              marginTop: 25,
              backgroundColor: theme.colors.accent,
            }}
          >
            <StyledButton
              onPress={() =>
                navigation.navigate("editProduct", { props: product })
              }
              textColor={backgroundColor}
              style={{ backgroundColor: theme.colors.accent }}
              contentStyle={{ padding: 10 }}
            >
              Make Changes
            </StyledButton>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
