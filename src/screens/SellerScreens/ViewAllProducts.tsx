import { View, Text, ScrollView, StatusBar, Platform } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import Animated, { FadeInDown } from "react-native-reanimated";
import AddProductButton from "../../components/AddProductButton";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { baseUrl } from "../../utils/localENV";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import ProductCard from "../../components/ProductCard";
import { screenWidth } from "../../utils/Dimensions";

const ViewAllProducts = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const theme = useTheme<ThemeInterface>();

  const allProducts = route.params.props;

  const backgroundColor = "white";
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

          {/* ADD PRODUCT */}
          <AddProductButton />
        </View>

        {/* HEADER SECTION */}
        <HeaderSection
          heading={`Your Products (${allProducts.length})`}
          subHeading="All your added product are here"
        />

        {/* PRODUCT LIST */}
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
          {allProducts?.map((prods: any, index: number) => {
            return <ProductCard prod={prods} index={index} key={prods.id} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewAllProducts;
