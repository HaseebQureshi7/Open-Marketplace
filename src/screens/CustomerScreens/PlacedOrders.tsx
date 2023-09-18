import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Platform, ScrollView, View } from "react-native";
import TypeWriter from "react-native-typewriter";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import OrderedProduct from "../../components/OrderedProduct";
import { UserDataContext } from "../../context/UserDataContext";
import { screenWidth } from "../../utils/Dimensions";
import { baseUrl } from "../../utils/localENV";

const PlacedOrders = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const backgroundColor = "white";

  const [orders, setOrders] = React.useState<any>([]);

  const { userData, setUserData }: any = React.useContext(UserDataContext);

  const getAllProducts = () => {
    return axios.get(
      baseUrl + `/order/getAllOrdersForCustomer/${userData?.id}`
    );
  };

  const { isLoading } = useQuery(["All Ordered Product"], getAllProducts, {
    onSuccess: (data) => {
      setOrders(data.data);
    },
    refetchInterval: 5000,
    // refetchInterval: 10000,
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          paddingHorizontal:
            Platform.OS === "web" ? (screenWidth / 100) * 5 : 25,
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 30,
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
          heading="Your Orders"
          subHeading="Track your orders here"
        />

        <View>
          {/* CARD */}
          {!isLoading ? (
            orders.length > 0 &&
            orders.map((order: any) => {
              return (
                <View
                  key={order.id}
                  style={{
                    // padding: 10,
                    width: "100%",
                    display: "flex",
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    // backgroundColor: "snow",
                    gap: Platform.OS === "web" ? 25 : 15,
                  }}
                >
                  <OrderedProduct product={order} />
                </View>
              );
            })
          ) : (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "rgb(31,30,30)",
                borderRadius: 2.5,
                padding: 10,
              }}
            >
              <TypeWriter
                // initialDelay={1000}
                typing={1}
                maxDelay={0}
                numberOfLines={1}
                style={{
                  color: "white",
                  fontFamily: "InterBold",
                }}
              >
                Fetching your orders ...
              </TypeWriter>
              <ActivityIndicator color={"white"} size={50} />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PlacedOrders;
