import React from "react";
import { Platform, ScrollView, StatusBar, View } from "react-native";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import ProductCard from "../../components/ProductCard";
import { WishlistContext } from "../../context/WishlistContext";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { screenWidth } from "../../utils/Dimensions";

const Wishlist = () => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const { wishlistItems, setWishlistItems }: any =
    React.useContext(WishlistContext);

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          paddingHorizontal:
            Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 40,
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

        {/* HEADER TEXT - ADD PROD */}
        <HeaderSection
          heading={`Wishlist (${wishlistItems?.length})`}
          subHeading="Stuff that make you feel special!"
        />

        {/* PRODUCTS LIST */}
        <View
          style={{
            width: "100%",
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
          {wishlistItems.length > 0 ? (
            wishlistItems?.map((prod: any, index: number) => {
              return <ProductCard prod={prod} index={index} key={prod.id} />;
            })
          ) : (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                marginTop: "50%",
              }}
            >
              <StyledText style={{ fontSize: 20 }}>
                Wishlist looks empty 🤔
              </StyledText>
              <StyledText
                style={{ fontSize: 12.5, color: theme.colors.placeholder }}
              >
                Looks like you have'nt wishlisted anything yet!
              </StyledText>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Wishlist;
