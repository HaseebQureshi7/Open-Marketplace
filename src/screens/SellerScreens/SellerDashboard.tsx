import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { isLoading } from "expo-font";
import StyledText from "../../styles/styledComponents/StyledText";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ThemeInterface } from "../../styles/theme";
import { ActivityIndicator, TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { StatusBar } from "expo-status-bar";
import { GetBusinessFromLS } from "../../utils/SaveUserToLS";
import axios from "axios";
import { baseUrl } from "../../utils/localENV";
import { useQueries, useQuery } from "@tanstack/react-query";
import { UserDataContext } from "../../context/UserDataContext";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  Layout,
  SlideInUp,
} from "react-native-reanimated";
import StyledView from "../../styles/styledComponents/StyledView";
import AddProductButton from "../../components/AddProductButton";
import ProductCard from "../../components/ProductCard";

const SellerDashboard = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const [search, setSearch] = React.useState<string>("");
  const [businessProducts, setBusinessProducts] = React.useState<Array<any>>(
    []
  );
  const [businessProdCategoriesId, setBusinessProdCategoriesId] =
    React.useState<Array<any>>([]);
  const [businessProdCategories, setBusinessProdCategories] = React.useState<
    Array<any>
  >([]);

  const { userData, setUserData }: any = React.useContext(UserDataContext);

  const getAllProducts = () => {
    return axios.get(
      baseUrl + `/product/getAllProductsOfBusiness/${userData?.id}`
    );
  };

  const { isLoading } = useQuery(["All Business Products"], getAllProducts, {
    onSuccess: (data) => {
      setBusinessProducts(data.data);
      // const filteredCat = data.data.filter((data:any) => setBusinessProdCategories((prevCat) => [...prevCat, data.category]))
      const filteredCat = data.data.filter((data: any) => {
        const tempSet = new Set();
        tempSet.add(data.category);
        // console.log("cat - ", data.category)
        setBusinessProdCategoriesId(() => [...tempSet]);
      });
    },
    refetchInterval: 3000,
    // refetchInterval: 10000,
  });

  const getAllProductsCategories = (cats: any) => {
    setBusinessProdCategories;
    return axios.get(baseUrl + `/category/getCategoryById/${cats}`);
  };

  const fetchAllProdCats = useQueries({
    queries: businessProducts.map((cId: any) => {
      return {
        queryKey: ["Product category -", cId.category],
        queryFn: () => getAllProductsCategories(cId.category),
        enabled: true, // Set enabled to true to enable the query by default
        onSuccess: (data: any) => {
          setBusinessProdCategories((prevState) => {
            // Check if the fetched data is already in the state to avoid duplication
            if (prevState.some((item) => item.id === data.data.id)) {
              return prevState;
            }
            return [...prevState, data.data];
          });
        },
      };
    }),
  });

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
          <AddProductButton />
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
              {userData ? userData?.name : "user-x"}
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
              Product Categories ({businessProdCategories?.length})
            </StyledText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("viewAllCategories", {
                  props: businessProdCategories,
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
          {/* PROD CATS */}
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
                  No Categories Present
                </Text>
                {/* <ActivityIndicator size={15} /> */}
              </TouchableOpacity>
            }
            exiting={FadeOut}
            // layout={Layout.delay(250)}
            data={businessProdCategories}
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
              Your Products ({businessProducts?.length})
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("viewAllProducts", {
                  props: businessProducts,
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
              businessProducts?.slice(0, 6)?.map((prod, index) => {
                return <ProductCard prod={prod} index={index} key={prod.id} />;
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

export default SellerDashboard;
