import React, { useContext } from "react";
import StyledView from "../../styles/styledComponents/StyledView";
import StyledText from "../../styles/styledComponents/StyledText";
import { screenHeight, screenWidth } from "../../utils/Dimensions";
import { StatusBar } from "expo-status-bar";
import { ThemeInterface } from "../../styles/theme";
import { Snackbar, TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBarHeight } from "../../utils/StatusbarHeight";
import StyledButton from "./../../styles/styledComponents/StyledButton";
import { baseUrl } from "../../utils/localENV";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { GetCustomerFromLS, SaveCustomerToLS } from "../../utils/SaveUserToLS";
import { SaveTokenToLS } from "../../utils/AuthTokenHandler";
import { StackNavigationProp } from "@react-navigation/stack";
import { SnackbarContext } from "../../context/SnackbarContext";
import { CommonActions } from "@react-navigation/native";
import { SnackStateProps } from "../../types/SnackbarTypes";

interface loginDataTypes {
  email: string;
  password: string;
}

const CustomerLogin = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 75
      : (screenWidth / 100) * 90;

  const theme = useTheme<ThemeInterface>();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { snackData, setSnackData }: SnackStateProps =
    useContext(SnackbarContext);

  const loginQuery = (loginData: loginDataTypes) => {
    return axios.post(baseUrl + "/customer/login", loginData);
  };

  const { mutate, isLoading } = useMutation(loginQuery, {
    onSuccess: (data) => {
      SaveTokenToLS(data.data.token).then(() =>
        SaveCustomerToLS(data.data.customer).then(() => {
          setSnackData({
            open: true,
            severity: "Success",
            text: "Login was Successfull",
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "customerStack" }],
            })
          );
        })
      );
      // GetCustomerFromLS().then((dat:any) => {
      //   console.log(dat);
      // })
    },
    onError: (e) => {
      console.log("login failed !!!", e);
    },
  });

  function HandleLogin() {
    if (password.length >= 1) {
      const loginData: loginDataTypes = {
        email,
        password,
      };
      mutate(loginData);
    } else {
      console.log("no");
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} />
      <StyledView
        style={{
          width: imageSize,
          height: screenHeight - StatusBarHeight,
          alignSelf: "center",
          paddingVertical: 50,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* HEADER */}
        <StyledView style={{ width: "100%", alignItems: "flex-start", gap: 5 }}>
          <StyledText style={{ fontSize: 32.5 }}>Greetings 👋</StyledText>
          <StyledText style={{ fontSize: 15, color: theme.colors.placeholder }}>
            <TypeWriter
              // initialDelay={1000}
              typing={1}
              maxDelay={0}
              numberOfLines={1}
              style={{
                textAlign: "right",
                width: "100%",
                paddingLeft: 2.5,
              }}
            >
              Log in to continue
            </TypeWriter>
          </StyledText>
        </StyledView>
        {/* INPUTS */}
        <StyledView
          style={{ width: "100%", alignItems: "flex-start", gap: 15 }}
        >
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
            // right={<TextInput.Affix text="/100" />}
            label="Email Address"
            value={email}
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            left={<TextInput.Icon style={{ paddingTop: 10 }} icon={"eye"} />}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            label="Password"
            value={password}
            secureTextEntry
            mode="outlined"
            style={{ width: "100%", height: 60, backgroundColor }}
            onChangeText={(text) => setPassword(text)}
          />
        </StyledView>
        {/* BUTTONS */}
        <StyledView
          style={{ width: "100%", alignItems: "flex-start", gap: 15 }}
        >
          <StyledButton
            style={{ borderColor: theme.colors.primary }}
            mode="contained"
            loading={isLoading}
            onPress={() => HandleLogin()}
          >
            Login
          </StyledButton>
        </StyledView>
        {/* SIGNUP */}
        <StyledView
          style={{ width: "100%", alignItems: "center", marginTop: 50 }}
        >
          <StyledText style={{ fontSize: 15, color: theme.colors.placeholder }}>
            Don’t have an account ?
          </StyledText>
          <StyledButton
            mode="text"
            labelStyle={{ fontSize: 15, textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("customerSignup")}
          >
            Sign up here
          </StyledButton>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default CustomerLogin;
