import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { isLoading } from "expo-font";
import StyledText from "../../styles/styledComponents/StyledText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ThemeInterface } from "../../styles/theme";
import { ActivityIndicator, TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { StatusBar } from "expo-status-bar";
import { GetBusinessFromLS } from "../../utils/SaveUserToLS";
import axios from "axios";
import { baseUrl } from "../../utils/localENV";
import { useQuery } from "@tanstack/react-query";
import { UserDataContext } from "../../context/UserDataContext";

const SellerDashboard = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const [search, setSearch] = React.useState<string>("");
  const [businessProducts, setBusinessProducts] = React.useState<Array<any>>();

  const { userData, setUserData }: any = React.useContext(UserDataContext);

  const getAllProducts = (addProdData: any) => {
    return axios.get(
      baseUrl + `/product/getAllProductsOfBusiness/${userData?.id}`
    );
  };

  const { isLoading } = useQuery(["All Business Products"], getAllProducts, {
    onSuccess: (data) => {
      // console.log(data.data);
      setBusinessProducts(data.data);
    },
  });

  const brands: any = [
    "VRand-1",
    "xTract-2",
    "fRe-3",
    "B-4U",
    5,
    6,
    7,
    8,
    9,
    0,
  ];

  const data = [];

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
          <TouchableOpacity
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
              Product Products
            </StyledText>
            <TouchableOpacity>
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
          <FlatList
            data={brands}
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item }) => (
              <Text
                style={{
                  padding: 15,
                  borderRadius: 5,
                  fontFamily: "InterBold",
                  backgroundColor: theme.colors.background,
                }}
              >
                {item}
              </Text>
            )}
            keyExtractor={(item) => item}
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
            <TouchableOpacity>
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
              marginBottom:25,
              gap: 15,
            }}
          >
            {!isLoading ? (
              businessProducts?.map((prod) => {
                return (
                  <Pressable
                    style={{ alignItems: "flex-start", gap: 5 }}
                    key={prod.id}
                  >
                    <Image
                      style={{ width: 150, height: 150, borderRadius: 10 }}
                      source={{
                        uri: `http://192.168.29.117:5000${prod.productImage}`,
                      }}
                    />
                    <StyledText>{prod.name}</StyledText>
                    <StyledText style={{ fontSize: 10 }}>
                      ₹ {prod.price}
                    </StyledText>
                  </Pressable>
                );
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
