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
import { Picker } from "@react-native-picker/picker";
import { Districts } from "../../utils/Districts";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const SellerSignup = ({ navigation }: any) => {
  const backgroundColor = "white";
  const imageSize =
    screenWidth > screenHeight
      ? (screenWidth / 100) * 75
      : (screenWidth / 100) * 90;

  const theme = useTheme<ThemeInterface>();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [location, setLocation] = React.useState("Srinagar");
  const [description, setDescription] = React.useState("");
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