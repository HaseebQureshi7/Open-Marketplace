import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import { ThemeInterface } from "../../styles/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import BackButton from "../../components/BackButton";
import AddProductButton from "../../components/AddProductButton";
import HeaderSection from "../../components/HeaderSection";
import axios from "axios";
import { baseUrl } from "../../utils/localENV";
import { useQuery } from "@tanstack/react-query";
import StyledText from "../../styles/styledComponents/StyledText";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryScreen = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const theme = useTheme<ThemeInterface>();

  const categoryDataProp = route.params.props;

  const backgroundColor = "white";

  const getAllProductsByCategory = () => {
    console.log(
      baseUrl + `/category/getProductsByCategory/${categoryDataProp?.id}`
    );
    return axios.get(
      baseUrl + `/category/getProductsByCategory/${categoryDataProp?.id}`
    );
  };

  const { data: prodsInCat, isLoading } = useQuery(
    ["All Products In Category"],
    getAllProductsByCategory,
    {
      onSuccess: (data: any) => {
        console.log(data.data);
      },
      select: (data: any) => {
        return data.data;
      },
    }
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      {/* BODY CONTAINER */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          gap: 25,
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

        {/* HEADER SECTION */}
        <HeaderSection
          heading={`${categoryDataProp.name} (${prodsInCat?.length})`}
          subHeading="All products under this category."
        />

        {/* PRODUCTS LIST IN CAT */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 15,
            marginBottom: 25,
            gap: 15,
          }}
        >
          {!isLoading ? (
            prodsInCat?.map((prod: any, index: number) => {
              return (
                <Animated.View
                  key={prod.id}
                  entering={FadeIn.delay(index * 100)}
                  exiting={FadeOut}
                  layout={Layout.delay(250)}
                >
                  <TouchableOpacity
                    onPress={() => console.log("first")}
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
                    <StyledText style={{ fontSize: 10 }}>
                      ₹ {prod.price}
                    </StyledText>
                  </TouchableOpacity>
                </Animated.View>
              );
            })
          ) : (
            <ActivityIndicator size={75} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;
