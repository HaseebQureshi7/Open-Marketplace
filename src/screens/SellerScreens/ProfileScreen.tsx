import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { UserDataContext } from "../../context/UserDataContext";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import { ThemeInterface } from "../../styles/theme";
import { baseUrl } from "../../utils/localENV";

const ProfileScreen = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const backgroundColor = "white";
  const theme = useTheme<ThemeInterface>();

  const { userData }: any = React.useContext(UserDataContext);

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

        {/* IMAGE & DETAILS */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT BOX -- DETAILS */}
          <View
            style={{
              width: "40%",
              height: 175,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <StyledText
              style={{
                fontSize: 20,
                fontFamily: theme.fonts.medium,
                textAlign: "right",
                alignSelf: "flex-end",
              }}
            >
              Your Profile Picture
            </StyledText>
            <StyledButton
              icon={() => (
                <AntDesign
                  style={{ marginHorizontal: 5 }}
                  name="edit"
                  size={20}
                  color={theme.colors.background}
                />
              )}
              mode="contained"
            >
              Change
            </StyledButton>
            <StyledButton
              style={{
                backgroundColor: theme.colors.error,
              }}
              icon={() => (
                <FontAwesome
                  name="remove"
                  style={{ marginHorizontal: 5 }}
                  size={20}
                  color={theme.colors.background}
                />
              )}
              mode="contained"
            >
              Remove
            </StyledButton>
          </View>
          {/* RIGHT BOX -- IMAGE */}
          <View
            style={{
              width: "60%",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            {/* IMAGE SECTION */}
            <Image
              style={{
                width: 175,
                height: 175,
                borderRadius: 5,
              }}
              source={{ uri: baseUrl + userData?.profilePicture }}
            />
          </View>
        </View>

        {/* PROFILE DETAILS */}
        <View style={{ marginTop: 25, gap: 25 }}>
          {/* NAME */}
          <View style={{}}>
            <StyledText
              style={{ fontSize: 12.5, color: theme.colors.placeholder }}
            >
              Business Name
            </StyledText>
            <StyledText style={{ fontSize: 20 }}>{userData?.name}</StyledText>
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
              Business Location
            </StyledText>
            <StyledText style={{ fontSize: 20 }}>
              {userData?.address + ", " + userData?.location}
            </StyledText>
          </View>

          {/* DESC */}
          <View style={{}}>
            <StyledText
              style={{ fontSize: 12.5, color: theme.colors.placeholder }}
            >
              Business Description
            </StyledText>
            <StyledText style={{ fontSize: 20 }}>
              {userData?.description}
            </StyledText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
