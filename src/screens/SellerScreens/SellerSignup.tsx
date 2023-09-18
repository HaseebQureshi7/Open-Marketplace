import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Image, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserDataContext } from "../../context/UserDataContext";
import StyledButton from "../../styles/styledComponents/StyledButton";
import StyledText from "../../styles/styledComponents/StyledText";
import StyledView from "../../styles/styledComponents/StyledView";
import { ThemeInterface } from "../../styles/theme";
import { SnackStateProps } from "../../types/SnackbarTypes";
import { SaveTokenToLS } from "../../utils/AuthTokenHandler";
import { screenHeight, screenWidth } from "../../utils/Dimensions";
import { Districts } from "../../utils/Districts";
import { RequestImage } from "../../utils/RequestImage";
import { SaveBusinessToLS } from "../../utils/SaveUserToLS";
import { baseUrl } from "../../utils/localENV";

const SellerSignup = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 75
      : (screenWidth / 100) * 90;

  const theme = useTheme<ThemeInterface>();

  interface signupDataTypes {
    name: string;
    email: string;
    phone: number;
    profilePicture: string;
    address: string;
    location: string;
    description: string;
    password: string;
  }

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<number | any>();
  const [profilePicture, setProfilePicture] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("Srinagar");
  const [description, setDescription] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPass, setConfirmPass] = React.useState<string>("");

  const { setSnackData }: SnackStateProps = useContext(SnackbarContext);

  const { setUserData }: any = useContext(UserDataContext);

  const UpdateImage = () => {
    RequestImage().then((res: any) => {
      setProfilePicture(res);
    });
  };

  const signupQuery = (signupData: signupDataTypes) => {
    return axios.post(baseUrl + "/business/signup", signupData);
  };

  const { mutate, isLoading } = useMutation(signupQuery, {
    onSuccess: (data: any) => {
      SaveTokenToLS(data.data.token).then(() =>
        SaveBusinessToLS(data.data.business).then(() => {
          setUserData(data.data.business);
          setSnackData({
            open: true,
            severity: "Success",
            text: "Signup was successful!",
          });
          navigation.reset({
            index: 0,
            routes: [{ name: "sellerStack" }],
          });
        })
      );
    },
    onError: () => {
      setSnackData({
        open: true,
        severity: "Error",
        text: "Something went wrong!",
      });
    },
  });

  function HandleSignup() {
    if (
      name.length > 3 &&
      email.includes("@") &&
      phone.length > 7 &&
      profilePicture &&
      address.length > 4 &&
      location.length > 4 &&
      description.length > 4 &&
      password.length >= 3
    ) {
      if (password === confirmPass) {
        const signupData: signupDataTypes = {
          name,
          email,
          phone,
          profilePicture,
          address,
          location,
          description,
          password,
        };
        mutate(signupData);
        // console.log(signupData);
      } else {
        setSnackData({
          open: true,
          severity: "Warning",
          text: "Passwords do not match!",
        });
      }
    } else {
      setSnackData({
        open: true,
        severity: "Warning",
        text: "Please provide all details!",
      });
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} />
      <StyledView
        style={{
          width: imageSize,
          alignSelf: "center",
          paddingVertical: 50,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* HEADER */}
        <StyledView style={{ width: "100%", alignItems: "flex-start", gap: 5 }}>
          <StyledText style={{ fontSize: 32.5 }}>Hey, Seller 👋</StyledText>
          <StyledText style={{ fontSize: 15, color: theme.colors.placeholder }}>
            <TypeWriter
              initialDelay={1000}
              typing={1}
              maxDelay={0}
              numberOfLines={1}
              style={{
                textAlign: "right",
                width: "100%",
                paddingLeft: 2.5,
              }}
            >
              Sign in to continue
            </TypeWriter>
          </StyledText>
        </StyledView>

        {/* INPUTS & DISCLAIMER (AT END) */}
        <StyledView
          style={{ width: "100%", alignItems: "flex-start", gap: 15 }}
        >
          {/* DP SECTION */}
          <StyledView
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            {/* IMAGE */}
            <Pressable
              style={{
                // width: "40%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => UpdateImage()}
            >
              <MaterialCommunityIcons
                style={{
                  position: "absolute",
                  zIndex: 1,
                  opacity: profilePicture ? 0 : 1,
                }}
                name="image-edit-outline"
                size={50}
                color="black"
              />
              <Image
                style={{
                  opacity: profilePicture ? 1 : 0.4,
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                source={
                  profilePicture
                    ? { uri: "data:image/png;base64," + profilePicture }
                    : require("../../../assets/images/storeplaceholder.jpg")
                }
              />
            </Pressable>

            {/* IMAGE TEXT */}
            <StyledView
              style={{ width: "60%", alignItems: "flex-start", gap: 10 }}
            >
              {/* IMAGE HEADER TEXT */}
              <StyledText style={{ fontSize: 25 }}>
                Upload a Profile Picture
              </StyledText>
              <StyledView>
                {/* IMAGE BOTTOM TEXT --> SUCCESS */}
                {profilePicture && (
                  <StyledView
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      gap: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <StyledText
                      style={{
                        fontSize: 15,
                        color: theme.colors.success,
                      }}
                    >
                      Store Picture Set
                    </StyledText>
                    <MaterialCommunityIcons
                      name="sticker-check-outline"
                      size={15}
                      color={theme.colors.success}
                    />
                  </StyledView>
                )}
                {/* IMAGE BOTTOM TEXT --> FAILURE */}
                {!profilePicture && (
                  <StyledView
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      gap: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <StyledText
                      style={{
                        fontSize: 15,
                        color: theme.colors.error,
                      }}
                    >
                      No Store Picture
                    </StyledText>
                    <MaterialIcons
                      name="error-outline"
                      size={15}
                      color={theme.colors.error}
                    />
                  </StyledView>
                )}
              </StyledView>
            </StyledView>
          </StyledView>

          {/* NAME */}
          <TextInput
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            left={
              <TextInput.Icon
                style={{ paddingTop: 10 }}
                icon={"office-building"}
              />
            }
            label="Organization Name"
            value={name}
            mode="outlined"
            onChangeText={(text) => setName(text)}
          />
          {/* EMAIL */}
          <TextInput
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            inputMode="email"
            left={
              <TextInput.Icon
                style={{ paddingTop: 10 }}
                icon={"email-outline"}
              />
            }
            label="Email Address"
            value={email}
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
          />
          {/* PHONE */}
          <TextInput
            left={<TextInput.Icon style={{ paddingTop: 10 }} icon={"phone"} />}
            label="Phone"
            inputMode="tel"
            value={phone}
            mode="outlined"
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            onChangeText={(text) => setPhone(text)}
          />
          {/* ADDRESS */}
          <TextInput
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            numberOfLines={1}
            inputMode="text"
            left={
              <TextInput.Icon
                style={{ paddingTop: 10 }}
                icon={() => (
                  <Entypo
                    name="address"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Address (Street or Mohalla)"
            value={address}
            mode="outlined"
            onChangeText={(text) => setAddress(text)}
          />
          {/* LOCATION */}
          <StyledView
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 60,
              borderWidth: 2,
              paddingHorizontal: 10,
              marginTop: 5,
              borderRadius: 10,
              borderColor: theme.colors.disabled,
            }}
          >
            {/* <EvilIcons name="location" size={24}  /> */}
            {/* <Entypo name="address" size={24} color="black" /> */}
            <StyledView style={{ width: "10%" }}>
              <Ionicons
                name="location-sharp"
                size={24}
                color={theme.colors.placeholder}
              />
            </StyledView>
            <Picker
              mode="dialog"
              style={{
                borderWidth: 0,
                width: "90%",
                height: "100%",
                padding: 15,
              }}
              selectedValue={location}
              onValueChange={(itemValue: any) => {
                setLocation(itemValue);
              }}
            >
              {Districts?.map((districts) => {
                return (
                  <Picker.Item
                    // style={{ color: theme.colors.placeholder }}
                    key={districts}
                    label={districts}
                    value={districts}
                  />
                );
              })}
            </Picker>
          </StyledView>
          {/* PASSWORD */}
          <TextInput
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            left={
              <TextInput.Icon
                style={{ paddingTop: 10 }}
                icon={() => (
                  <MaterialCommunityIcons
                    name="lastpass"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Password"
            value={password}
            secureTextEntry
            mode="outlined"
            onChangeText={(text) => setPassword(text)}
          />
          {/* CONFIRM PASSWORD */}
          <TextInput
            left={
              <TextInput.Icon
                style={{ paddingTop: 10 }}
                icon={() => (
                  <MaterialCommunityIcons
                    name="lastpass"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Confirm Password"
            numberOfLines={1}
            value={confirmPass}
            mode="outlined"
            style={{ width: "100%", height: 60, backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            secureTextEntry
            onChangeText={(text) => setConfirmPass(text)}
          />
          {/* DESC */}
          <TextInput
            left={<TextInput.Icon icon={"file"} />}
            label="Description"
            multiline
            numberOfLines={5}
            value={description}
            mode="outlined"
            style={{ width: "100%", backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            onChangeText={(text) => setDescription(text)}
          />
          {/* DISCLAIMER */}
          <StyledText style={{ color: theme.colors.primary }}>
            By singing up ,you agree to our terms of service and acknowledge the
            privacy policy.
          </StyledText>
        </StyledView>

        {/* BUTTONS */}
        <StyledView
          style={{ width: "100%", alignItems: "flex-start", gap: 15 }}
        >
          <StyledButton
            loading={isLoading}
            mode="contained"
            onPress={() => HandleSignup()}
          >
            Sign up
          </StyledButton>
        </StyledView>

        {/* LOGIN */}
        <StyledView
          style={{ width: "100%", alignItems: "center", marginTop: 50 }}
        >
          <StyledText style={{ fontSize: 15, color: theme.colors.placeholder }}>
            Already have an account ?
          </StyledText>
          <StyledButton
            mode="text"
            labelStyle={{ fontSize: 15, textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("sellerLogin")}
          >
            Login here
          </StyledButton>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default SellerSignup;
