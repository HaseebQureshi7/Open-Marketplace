import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import StyledText from "../../styles/styledComponents/StyledText";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ThemeInterface } from "../../styles/theme";
import { ActivityIndicator, TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { StatusBar } from "expo-status-bar";
import { GetCustomerFromLS } from "../../utils/SaveUserToLS";
import axios from "axios";
import { baseUrl } from "../../utils/localENV";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { FormatPriceWithCommas } from "../../utils/PriceFormatter";
import { screenWidth } from "../../utils/Dimensions";
import { screenSize } from "../../utils/ResponsiveUtils";

const CustomerDashboard = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const [search, setSearch] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
  const [userData, setUserData] = React.useState<any>();
  const [currentBanner, setCurrentBanner] = React.useState<number>(0);
  const [allProducts, setAllProducts] = React.useState<String[]>();
  const [allProdCats, setAllProdCats] = React.useState<any[]>();

  const getAllProductCategories = () => {
    return axios.get(baseUrl + `/category/getAllCategories`);
  };

  const { isLoading: loadingProdCats } = useQuery(
    ["All Categories"],
    getAllProductCategories,
    {
      onSuccess: (data) => {
        setAllProdCats(data.data);
        // console.log(data.data.length);
      },
      // refetchInterval: 3000,
      // refetchInterval: 10000,
    }
  );

  const getAllProducts = () => {
    return axios.get(baseUrl + `/product/getAllProducts`);
  };

  const { isLoading } = useQuery(["All Products"], getAllProducts, {
    onSuccess: (data) => {
      setAllProducts(data.data);
    },
    refetchInterval: 3000,
    // refetchInterval: 10000,
  });

  // SEARCH PRODS BY FILTERING THE ALREADY FETCHED ONES
  const SearchProducts = () => {
    if (search.length < 3) {
      // console.log("before -> ", searchResults);
      setSearchResults([]);
      // console.log("after -> ", searchResults);
    } else {
      setSearchResults(
        // @ts-ignore
        allProducts?.filter((prod: any) =>
          prod.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  React.useEffect(() => {
    GetCustomerFromLS().then((dat: any) => {
      setUserData(dat);
    });

    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % 3);
    }, 7500);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      {/* BODY CONTAINER */}
      <Animated.View
        layout={Layout.delay(100)}
        style={{
          flex: 1,
          paddingHorizontal:
            Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
          gap: 25,
        }}
      >
        <StatusBar animated={true} backgroundColor={backgroundColor} />

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* CLOSE */}
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // paddingLeft: 20,
              marginTop: 10,
            }}
          >
            <AntDesign
              name="menu-unfold"
              style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: theme.colors.background,
              }}
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          {/* CART */}
          <TouchableOpacity
            onPress={() => navigation.navigate("placedOrders")}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // paddingLeft: 20,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="shopping-cart"
              style={{
                padding: 12.5,
                borderRadius: 5,
                backgroundColor: theme.colors.background,
              }}
              size={25}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>

        {/* HEADER TEXT */}
        <View>
          <StyledText
            style={{
              fontSize: 35,
              color: theme.colors.text,
            }}
          >
            Hello 👋
          </StyledText>
          <StyledText
            style={{
              fontSize: 15,
              color: theme.colors.placeholder,
              fontFamily: "InterMedium",
            }}
          >
            Welcome back,
            <TypeWriter
              // initialDelay={1000}
              typing={1}
              maxDelay={0}
              numberOfLines={1}
              style={{
                textAlign: "right",
                width: "100%",
                paddingLeft: 2.5,
                fontFamily: "InterBold",
              }}
            >
              {userData ? " " + userData?.firstName : "user-x"}
            </TypeWriter>
          </StyledText>
        </View>

        {/* SEARCH BAR */}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 0,
              backgroundColor: theme.colors.background,
            }}
            inputMode="search"
            left={
              <TextInput.Icon
                style={{ paddingTop: 10 }}
                icon={() => (
                  <AntDesign
                    name="search1"
                    size={25}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            // right={<TextInput.Affix text="/100" />}
            label="Search Products"
            value={search}
            mode="outlined"
            onChangeText={(text) => {
              setSearch(text);
              SearchProducts();
            }}
          />
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={Layout.delay(100)}
            style={{ width: "100%" }}
          >
            {searchResults?.length > 0 && (
              <Text
                style={{
                  color: theme.colors.placeholder,
                  padding: 5,
                  marginTop: 5,
                }}
              >
                Results ({searchResults?.length})
              </Text>
            )}
            {searchResults?.map((prod: any) => {
              return (
                <TouchableOpacity
                  key={prod.id}
                  onPress={() =>
                    navigation.navigate("productScreen", { props: prod })
                  }
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // backgroundColor: theme.colors.info,
                    borderWidth: 2.5,
                    borderColor: theme.colors.info,
                    marginVertical: 5,
                    padding: 2.5,
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 2.5 }}
                    source={{
                      uri: baseUrl + prod.productImage,
                    }}
                  />
                  <StyledText
                    style={{
                      fontSize: 15,
                      width: "60%",
                      color: theme.colors.text,
                    }}
                  >
                    {prod.name}
                  </StyledText>
                  <StyledText
                    style={{
                      marginLeft: "auto",
                      marginRight: 5,
                      color: theme.colors.primary,
                    }}
                  >
                    ₹ {FormatPriceWithCommas(prod.price)}
                  </StyledText>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>

        {/* SALE BANNERS */}
        {/* WINTER SALE */}
        {/* CHRISTMAS SALE */}
        {/* EID SALE */}

        <Animated.View style={{ width: "100%" }} entering={FadeIn.delay(250)}>
          {currentBanner === 0 ? (
            // WINTER SALE
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={{
                width: screenWidth,
                alignSelf: "center",
                flexDirection: "row",
                backgroundColor: "#FECAC9",
                alignItems: "center",
                justifyContent: "center",
                gap: 25,
                padding: 10,
              }}
            >
              <Image
                style={{ width: 75, height: 75 }}
                source={require("../../../assets/images/jacket.gif")}
              />
              {/* TEXTS */}
              <View style={{ gap: 5 }}>
                <StyledText style={{ color: "black", fontSize: 10 }}>
                  50% Off on Clothing and Apparels.
                </StyledText>
                {/* TEXT WITH ICON */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="snowflake-o" size={22.5} color={"black"} />
                  <StyledText style={{ color: "black", fontSize: 22.5 }}>
                    Winter Sale
                  </StyledText>
                </View>
                <StyledText style={{ color: "black", fontSize: 7.5 }}>
                  Upto 50% Off on Winter Clothing and Apperal.
                </StyledText>
              </View>
            </Animated.View>
          ) : currentBanner === 1 ? (
            // CHRISTMAS SALE
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={{
                width: screenWidth,
                alignSelf: "center",
                flexDirection: "row",
                backgroundColor: "#FFD200",
                alignItems: "center",
                justifyContent: "center",
                gap: 25,
                padding: 10,
              }}
            >
              <Image
                style={{ width: 75, height: 75 }}
                source={require("../../../assets/images/seller.gif")}
              />
              {/* TEXTS */}
              <View style={{ gap: 5 }}>
                <StyledText
                  style={{ color: theme.colors.background, fontSize: 10 }}
                >
                  40% Off on Electronics.
                </StyledText>
                {/* TEXT WITH ICON */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name="laptop"
                    size={22.5}
                    color={theme.colors.background}
                  />
                  <StyledText
                    style={{ color: theme.colors.background, fontSize: 22.5 }}
                  >
                    Christmas Sale
                  </StyledText>
                </View>
                <StyledText
                  style={{ color: theme.colors.background, fontSize: 7.5 }}
                >
                  Upto 40% Off on Selected Electronics.
                </StyledText>
              </View>
            </Animated.View>
          ) : (
            // EID SALE
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={{
                width: screenWidth,
                alignSelf: "center",
                flexDirection: "row",
                // backgroundColor: theme.colors.info,
                alignItems: "center",
                justifyContent: "center",
                gap: 25,
                padding: 10,
              }}
            >
              <Image
                style={{ width: 75, height: 75 }}
                source={require("../../../assets/images/window.gif")}
              />
              {/* TEXTS */}
              <View style={{ gap: 5 }}>
                <StyledText style={{ color: "black", fontSize: 10 }}>
                  60% Off on Home Decor.
                </StyledText>
                {/* TEXT WITH ICON */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="home" size={22.5} color={"black"} />
                  <StyledText style={{ color: "black", fontSize: 22.5 }}>
                    Eid Day Sale
                  </StyledText>
                </View>
                <StyledText style={{ color: "black", fontSize: 7.5 }}>
                  Upto 60% Off on all Home Decor Products.
                </StyledText>
              </View>
            </Animated.View>
          )}
        </Animated.View>

        {/* BODY */}
        {/* CATEGORIES */}
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {/* HEADER TEXT */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledText style={{ fontSize: 20, fontFamily: theme.fonts.bold }}>
              Product Categories
            </StyledText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("viewAllCategories", {
                  props: allProdCats,
                })
              }
            >
              <StyledText
                style={{
                  fontSize: 12.5,
                  fontFamily: theme.fonts.medium,
                  color: theme.colors.placeholder,
                  textDecorationLine: "underline",
                }}
              >
                View All
              </StyledText>
            </TouchableOpacity>
          </View>
          <Animated.FlatList
            entering={FadeIn}
            ListEmptyComponent={
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  padding: 15,
                  borderRadius: 5,
                  gap: 10,
                  backgroundColor: theme.colors.background,
                }}
              >
                <Text
                  style={{
                    fontFamily: "InterBold",
                  }}
                >
                  Loading Categories ...
                </Text>
                <ActivityIndicator size={15} />
              </TouchableOpacity>
            }
            exiting={FadeOut}
            // layout={Layout.delay(250)}
            data={allProdCats}
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("categoryScreen", { props: item })
                }
              >
                <Text
                  style={{
                    padding: 15,
                    borderRadius: 5,
                    fontFamily: "InterBold",
                    backgroundColor: theme.colors.background,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* NEW ARRIVALS */}
        <View style={{ flex: 1, gap: 1 }}>
          {/* HEADER TEXT */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "InterBold" }}>
              Newest Arrivals ({allProducts?.length})
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("viewAllProducts", {
                  props: allProducts,
                })
              }
            >
              <StyledText
                style={{
                  fontSize: 12.5,
                  fontFamily: theme.fonts.medium,
                  color: theme.colors.placeholder,
                  textDecorationLine: "underline",
                }}
              >
                View All
              </StyledText>
            </TouchableOpacity>
          </View>
          {/* PRODUCTS LIST */}
          <Animated.View
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
            layout={Layout.delay(250)}
          >
            {!isLoading
              ? allProducts?.map((prod: any, index: number) => {
                  // @ts-ignore
                  return (
                    <ProductCard prod={prod} index={index} key={prod?.id} />
                  );
                })
              : Array.from({
                  length:
                    screenSize === "ultraWide"
                      ? 10
                      : screenSize === "wide"
                      ? 6
                      : 4,
                }).map((data, index) => {
                  return (
                    <Animated.View
                      key={index}
                      entering={FadeIn.delay(250 * index)}
                      exiting={FadeOut}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
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
                        backgroundColor: theme.colors.placeholder,
                      }}
                    >
                      <ActivityIndicator
                        size={75}
                        color={theme.colors.background}
                      />
                    </Animated.View>
                  );
                })}
          </Animated.View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default CustomerDashboard;
