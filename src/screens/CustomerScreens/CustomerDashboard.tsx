import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { isLoading } from "expo-font";
import StyledText from "../../styles/styledComponents/StyledText";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ThemeInterface } from "../../styles/theme";
import { ActivityIndicator, TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { StatusBar } from "expo-status-bar";
import { GetBusinessFromLS, GetCustomerFromLS } from "../../utils/SaveUserToLS";
import axios from "axios";
import { baseUrl } from "../../utils/localENV";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const CustomerDashboard = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const [search, setSearch] = React.useState<string>("");
  const [userData, setUserData] = React.useState<any>();
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
        console.log(data.data.length);
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

  React.useEffect(() => {
    GetCustomerFromLS().then((dat: any) => {
      setUserData(dat);
    });
  }, []);

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

          {/* ADD PRODUCT */}
          {/* <TouchableOpacity
            onPress={() => navigation.closeDrawer()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // paddingLeft: 20,
              marginTop: 10,
            }}
          >
            <Ionicons
              name="add"
              style={{
                padding: 12.5,
                borderRadius: 5,
                backgroundColor: theme.colors.background,
              }}
              size={25}
              color={theme.colors.text}
            />
          </TouchableOpacity> */}
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
            flexDirection: "row",
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
            onChangeText={(text) => setSearch(text)}
          />
        </View>

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
              allProducts?.slice(0, 6)?.map((prod, index) => {
                // @ts-ignore
                return <ProductCard prod={prod} index={index} key={prod?.id} />;
              })
            ) : (
              <ActivityIndicator size={75} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomerDashboard;
