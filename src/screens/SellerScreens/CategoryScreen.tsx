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
import ProductCard from "../../components/ProductCard";

const CategoryScreen = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const theme = useTheme<ThemeInterface>();

  const categoryDataProp = route.params.props;
  // console.log(categoryDataProp)

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
      onSuccess: (data: any) => {
        // console.log(data);
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
