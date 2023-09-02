import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React from "react";
  import BackButton from "../../components/BackButton";
  import HeaderSection from "../../components/HeaderSection";
  import StyledView from "../../styles/styledComponents/StyledView";
  import { AntDesign, FontAwesome } from "@expo/vector-icons";
  import { ThemeInterface } from "../../styles/theme";
  import { useTheme } from "react-native-paper";
  import { DrawerNavigationProp } from "@react-navigation/drawer";
  import { UserDataContext } from "../../context/UserDataContext";
  import StyledText from "../../styles/styledComponents/StyledText";
  import StyledButton from "../../styles/styledComponents/StyledButton";
  import { baseUrl } from "../../utils/localENV";
import { FormatUserFriendlyTime } from "../../utils/DateFormatter";
import { StatusBar } from "expo-status-bar";
  
  const CustomerProfile = ({
    navigation,
    route,
  }: {
    navigation: DrawerNavigationProp<any>;
    route: any;
  }) => {
    const backgroundColor = "white";
    const theme = useTheme<ThemeInterface>();
  
    const { userData, setUserData }: any = React.useContext(UserDataContext);
  
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
  
          {/* HEADER TEXT - ADD PROD */}
          <HeaderSection
            heading="Profile"
            subHeading="Make changes to your profile"
          />
  
          {/* PROFILE DETAILS */}
          <View style={{ marginTop: 25, gap: 25 }}>
            {/* NAME */}
            <View style={{}}>
              <StyledText
                style={{ fontSize: 12.5, color: theme.colors.placeholder }}
              >
                Your Name
              </StyledText>
              <StyledText style={{ fontSize: 20 }}>{userData?.firstName + " " + userData?.lastName}</StyledText>
            </View>
  
            {/* PHONE */}
            <View style={{}}>
              <StyledText
                style={{ fontSize: 12.5, color: theme.colors.placeholder }}
              >
                Phone Number
              </StyledText>
              <StyledText style={{ fontSize: 20 }}>{userData?.phone}</StyledText>
            </View>
  
            {/* LOCATION */}
            <View style={{}}>
              <StyledText
                style={{ fontSize: 12.5, color: theme.colors.placeholder }}
              >
                Your Email
              </StyledText>
              <StyledText style={{ fontSize: 20 }}>
                {userData?.email}
              </StyledText>
            </View>
  
            {/* DESC */}
            <View style={{}}>
              <StyledText
                style={{ fontSize: 12.5, color: theme.colors.placeholder }}
              >
                Member Since
              </StyledText>
              <StyledText style={{ fontSize: 20 }}>
                {FormatUserFriendlyTime(userData?.addedAt)}
              </StyledText>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default CustomerProfile;
  