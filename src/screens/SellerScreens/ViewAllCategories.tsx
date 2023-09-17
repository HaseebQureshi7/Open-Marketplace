import { View, ScrollView, Image, Platform } from "react-native";
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
import { UserDataContext } from "../../context/UserDataContext";
import { screenWidth } from "../../utils/Dimensions";
import { screenSize } from "../../utils/ResponsiveUtils";

const ViewAllCategories = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const theme = useTheme<ThemeInterface>();

  const categoriesDataProp = route.params.props;

  const { userData }: any = React.useContext(UserDataContext);

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
          {userData?.name && <AddProductButton />}
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
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 15,
            marginBottom: 25,
            gap: 20,
          }}
        >
          {categoriesDataProp?.map((cats: any) => {
            return (
              <TouchableOpacity
                key={cats.id}
                onPress={() =>
                  navigation.navigate("categoryScreen", { props: cats })
                }
                style={{
                  width:
                    screenSize === "ultraWide"
                      ? (screenWidth / 100) * 15
                      : screenSize === "wide"
                      ? (screenWidth / 100) * 25
                      : (screenWidth / 100) * 40,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
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
