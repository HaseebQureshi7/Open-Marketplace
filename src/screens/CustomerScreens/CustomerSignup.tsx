import React from "react";
import StyledView from "../../styles/styledComponents/StyledView";
import StyledText from "../../styles/styledComponents/StyledText";
import { screenHeight, screenWidth } from "../../utils/Dimensions";
import { StatusBar } from "expo-status-bar";
import { ThemeInterface } from "../../styles/theme";
import { TextInput, useTheme } from "react-native-paper";
import TypeWriter from "react-native-typewriter";
import { ScrollView } from "react-native-gesture-handler";
import StyledButton from "../../styles/styledComponents/StyledButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const CustomerSignup = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 75
      : (screenWidth / 100) * 90;

  const theme = useTheme<ThemeInterface>();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");

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
          <StyledText style={{ fontSize: 32.5 }}>Hey, Customer 👋</StyledText>
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
          {/* FIRST NAME */}
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
                  <Ionicons
                    name="person-circle-outline"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="First Name"
            value={firstName}
            mode="outlined"
            onChangeText={(text) => setFirstName(text)}
          />
          {/* LAST NAME */}
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
                  <Ionicons
                    name="people-circle"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Last Name"
            value={lastName}
            mode="outlined"
            onChangeText={(text) => setLastName(text)}
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
            inputMode="numeric"
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
              style={{ width: "100%", height: 60, backgroundColor }}
              outlineStyle={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.colors.disabled,
              }}
              label="Confirm Password"
              value={confirmPass}
              secureTextEntry
              mode="outlined"
              onChangeText={(text) => setConfirmPass(text)}
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
          <StyledButton mode="contained" onPress={() => console.log("first")}>
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
            onPress={() => navigation.navigate("customerLogin")}
          >
            Login here
          </StyledButton>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default CustomerSignup;
