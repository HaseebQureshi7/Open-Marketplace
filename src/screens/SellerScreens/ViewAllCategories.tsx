import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import Animated, { FadeInDown } from "react-native-reanimated";
import AddProductButton from "../../components/AddProductButton";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { UserDataContext } from "../../context/UserDataContext";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { screenWidth } from "../../utils/Dimensions";
import { screenSize } from "../../utils/ResponsiveUtils";
import { baseUrl } from "../../utils/localENV";

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
