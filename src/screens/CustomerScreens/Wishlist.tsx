import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { ThemeInterface } from "../../styles/theme";
import { GetWishlist } from "../../utils/WishlistFunction";
import ProductCard from "../../components/ProductCard";
import { WishlistContext } from "../../context/WishlistContext";

const Wishlist = () => {
  const theme = useTheme<ThemeInterface>();

  const backgroundColor = "white";

  const { wishlistItems, setWishlistItems }: any =
    React.useContext(WishlistContext);

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
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
          {wishlistItems?.slice(0, 6)?.map((prod: any, index: number) => {
            return <ProductCard prod={prod} index={index} key={prod.id} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Wishlist;
