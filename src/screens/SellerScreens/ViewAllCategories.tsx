import { View, ScrollView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import { ThemeInterface } from "../../styles/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import TypeWriter from "react-native-typewriter";
import StyledText from "../../styles/styledComponents/StyledText";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import AddProductButton from "../../components/AddProductButton";
import HeaderSection from "../../components/HeaderSection";
import { StackRouterOptions } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { baseUrl } from "../../utils/localENV";
import { TouchableOpacity } from "react-native-gesture-handler";

const ViewAllCategories = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const theme = useTheme<ThemeInterface>();

  const categoriesDataProp = route.params.props;

  const backgroundColor = "white";
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

          {/* ADD PRODUCT */}
          <AddProductButton />
        </View>

        {/* HEADER SECTION */}
        <HeaderSection
          heading={`Your Categories (${categoriesDataProp.length})`}
          subHeading="All your product categories are here."
        />

        {/* PROD CATEGORIES LIST */}
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
          {categoriesDataProp?.map((cats: any) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("categoryScreen", { props: cats })
                }
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Animated.Image
                  exiting={FadeInDown}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    backgroundColor: theme.colors.background,
                  }}
                  source={{
                    uri: baseUrl + cats.categoryImage,
                  }}
                />
                <StyledText>{cats.name}</StyledText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewAllCategories;
