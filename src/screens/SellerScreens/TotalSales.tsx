import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Platform, ScrollView, StatusBar, View } from "react-native";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { UserDataContext } from "../../context/UserDataContext";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { CalculatePercentage } from "../../utils/CalculatePercentage";
import { screenWidth } from "../../utils/Dimensions";
import { FormatPriceWithCommas } from "../../utils/PriceFormatter";
import { baseUrl } from "../../utils/localENV";

const TotalSales = () => {
  const backgroundColor = "white";

  const theme = useTheme<ThemeInterface>();

  const { userData }: any = React.useContext(UserDataContext);
  const [mSale, setMSale] = React.useState<any>();

  const getMonthlySale = () => {
    return axios.get(baseUrl + `/monthSales/getMonthSales/${userData?.id}`);
  };

  const { isLoading } = useQuery(
    [`Monthly Sale ${userData?.id}`],
    getMonthlySale,
    {
      onSuccess: (data) => {
        setMSale(data.data);
      },
      refetchInterval: 1000,
    }
  );

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
          heading="Total Sales"
          subHeading="Track your sales here"
        />

        {/* MID SECTION */}
        <View
          style={{
            marginTop: "40%",
            marginBottom: "30%",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <StyledText style={{ fontSize: 20 }}>
            Total Sales in {mSale?.month}
          </StyledText>
          <StyledText style={{ fontSize: 35, color: theme.colors.success }}>
            ₹{" "}
            {FormatPriceWithCommas(mSale?.totalSales)
              ? FormatPriceWithCommas(mSale?.totalSales)
              : 0}
          </StyledText>
        </View>

        {/* BOTTOM DETAILS */}
        {/* OPTIONS */}
        <View style={{ gap: 10 }}>
          {/* MONTH */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText>Month</StyledText>
            <StyledText
              style={{ fontSize: 15, color: theme.colors.notification }}
            >
              {mSale?.month}
            </StyledText>
          </View>
          {/* Percentage */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText>Percentage:</StyledText>
            <StyledText
              style={{
                fontSize: 15,
                color: theme.colors.info,
              }}
            >
              {mSale?.chargedPercentage}%
            </StyledText>
          </View>
          {/* Overall Sales: */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText>Overall Sales:</StyledText>
            <StyledText
              style={{
                fontSize: 15,
                color: theme.colors.success,
              }}
            >
              ₹ {FormatPriceWithCommas(mSale?.totalSales)}
            </StyledText>
          </View>
          {/* PAYMENT DUE */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <StyledText style={{ fontSize: 15 }}>Payment Due:</StyledText>
            <StyledText
              style={{
                fontSize: 25,
                color: theme.colors.primary,
              }}
            >
              ₹{" "}
              {CalculatePercentage(mSale?.totalSales, mSale?.chargedPercentage)}
              {/* {CalculatePercentage(
                mSale?.totalSales,
                mSale?.chargedPercentage
              ) < 500
                ? "0"
                : CalculatePercentage(
                    mSale?.totalSales,
                    mSale?.chargedPercentage
                  )} */}
            </StyledText>
          </View>
          <StyledText style={{ fontSize: 10 }}>
            Due amount less than ₹ 500 will not be charged to the seller.
          </StyledText>
        </View>

        {/* CONTINUE BUTTON */}
        <StyledButton
          // onPress={() => HandleSubmit()}
          textColor={backgroundColor}
          disabled={
            CalculatePercentage(mSale?.totalSales, mSale?.chargedPercentage) <
            500
          }
          style={{
            backgroundColor: theme.colors.primary,
            width: screenWidth,
            alignSelf: "center",
            borderRadius: 0,
            marginVertical: 25,
          }}
          contentStyle={{ padding: 10 }}
        >
          Pay
        </StyledButton>
      </View>
    </ScrollView>
  );
};

export default TotalSales;
