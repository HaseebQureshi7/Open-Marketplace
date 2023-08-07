import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { isLoading } from "expo-font";
import StyledText from "../../styles/styledComponents/StyledText";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ThemeInterface } from "../../styles/theme";
import { TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";

const SellerDashboard = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const [search, setSearch] = React.useState("");

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
    <ScrollView style={{ flex: 1, backgroundColor }}>
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
                padding: 10,
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
              Trends Fashion.
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
              Your Products ({!isLoading ? data?.length : 0})
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
              gap: 15,
            }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SellerDashboard;
