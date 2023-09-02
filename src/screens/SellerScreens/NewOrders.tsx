import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { theme } from "../../styles/theme";
import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios from "axios";
import { baseUrl } from "../../utils/localENV";
import { useQuery } from "@tanstack/react-query";
import { UserDataContext } from "../../context/UserDataContext";
import OrderedProduct from "../../components/OrderedProduct";
import { ActivityIndicator } from "react-native-paper";

const NewOrders = ({
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
      baseUrl + `/order/getAllOrdersForBusiness/${userData?.id}`
    );
  };

  const { isLoading } = useQuery(["New Orders"], getAllProducts, {
    onSuccess: (data) => {
      setOrders(data.data);
      // console.log(data.data);
    },
    refetchInterval: 5000,
    // refetchInterval: 10000,
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingTop: 15 }}>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
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

          {/* ADD PRODUCT */}
          {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // paddingLeft: 20,
              marginTop: 10,
            }}
          >
            <AntDesign
              name="edit"
              style={{
                padding: 12.5,
                borderRadius: 5,
                backgroundColor: theme.colors.background,
              }}
              size={25}
              color={theme.colors.placeholder}
            />
          </TouchableOpacity> */}
        </View>

        {/* HEADER TEXT - ADD PROD */}
        <HeaderSection
          heading="New Orders"
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
                    gap: 15,
                  }}
                >
                  <OrderedProduct product={order} />
                </View>
              );
            })
          ) : (
            <ActivityIndicator size={50} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default NewOrders;
