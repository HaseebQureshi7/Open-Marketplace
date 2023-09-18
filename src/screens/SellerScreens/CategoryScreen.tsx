import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import ProductCard from "../../components/ProductCard";
import { ThemeInterface } from "../../styles/theme";
import { screenWidth } from "../../utils/Dimensions";
import { baseUrl } from "../../utils/localENV";

const CategoryScreen = ({
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const categoryDataProp = route.params.props;

  const backgroundColor = "white";

  const getAllProductsByCategory = () => {
    return axios.get(
      baseUrl + `/product/getAllProductsInCategory/${categoryDataProp?.id}`
    );
  };

  const { data: prodsInCat, isLoading } = useQuery(
    ["All Products In Category"],
    getAllProductsByCategory,
    {
      onSuccess: () => {
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
          paddingHorizontal:
            Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
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
            alignItems: "flex-start",
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
              return <ProductCard prod={prod} index={index} key={prod.id} />;
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
