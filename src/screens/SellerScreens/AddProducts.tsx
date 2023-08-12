import { View, Image, Pressable } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { ThemeInterface } from "../../styles/theme";
import {
  ActivityIndicator,
  Switch,
  TextInput,
  useTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import StyledView from "../../styles/styledComponents/StyledView";
import BackButton from "../../components/BackButton";
import StyledText from "../../styles/styledComponents/StyledText";
import TypeWriter from "react-native-typewriter";
import HeaderSection from "../../components/HeaderSection";
import React from "react";
import { screenWidth } from "../../utils/Dimensions";
import { RequestImage } from "../../utils/RequestImage";

const AddProducts = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) => {
  const theme = useTheme<ThemeInterface>();
  const backgroundColor = "white";

  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<number | any>(0);
  const [sellerId, setSellerId] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [availableUnits, setAvailableUnits] = React.useState<number | any>(0);
  const [deliveryRadius, setDeliveryRadius] = React.useState<string>("");
  const [cashOnDelivery, setCashOnDelivery] = React.useState<boolean>(false);
  const [isReturnable, setIsReturnable] = React.useState<boolean>(false);

  let isLoading = false;

  const UpdateImage = () => {
    RequestImage().then((res: any) => {
      setImage(res);
    });
  };

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

        {/* HEADER ICONS */}
        <StyledView
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* BACK */}
          <BackButton />

          {/* ICON 2 */}
          {/* <Pressable
          onPress={() => navigation.goBack()}
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // paddingLeft: 20,
            marginTop: 10,
          }}
        >
          <Ionicons
            name="arrow-back"
            style={{
              padding: 12.5,
              borderRadius: 5,
              backgroundColor: theme.colors.background,
            }}
            size={25}
            color={theme.colors.placeholder}
          />
        </Pressable> */}
        </StyledView>

        {/* HEADER TEXT - ADD PROD */}
        <HeaderSection
          heading="Add Product"
          subHeading="Add details for a new product"
        />

        {/* ADD IMAGE */}
        <Pressable
          onPress={() => UpdateImage()}
          style={{
            flex: 1,
            width: screenWidth,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {/* EDIT IMAGE ICON */}
          <View
            style={{
              width: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="add-outline"
              style={{ marginBottom: 10 }}
              size={100}
              color={theme.colors.text}
            />
            {image ? null : (
              <StyledText style={{ color: theme.colors.text }}>
                Add Image
              </StyledText>
            )}
          </View>
          {/* PLACEHOLDER || SELECTED IMAGE */}
          <Image
            style={{ width: "100%", height: 400, opacity: image ? 1 : 0.2 }}
            source={
              image
                ? { uri: "data:image/png;base64," + image }
                : require("../../../assets/images/stuff.jpg")
            }
          />
        </Pressable>

        {/* INPUTS - 1 */}
        <StyledView style={{ width: "100%", gap: 25 }}>
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
                icon={() => (
                  <MaterialIcons
                    name="drive-file-rename-outline"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Product Name"
            value={name}
            mode="outlined"
            onChangeText={(text) => setName(text)}
          />
          {/* PRICE AND UNITS */}
          <StyledView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            {/* PRICE */}
            <TextInput
              style={{ flex: 1, height: 60, backgroundColor }}
              outlineStyle={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.colors.disabled,
              }}
              left={
                <TextInput.Icon
                  style={{ paddingTop: 10 }}
                  icon={() => (
                    <Entypo
                      name="price-tag"
                      size={24}
                      color={theme.colors.placeholder}
                    />
                  )}
                />
              }
              right={
                <TextInput.Affix
                  textStyle={{ paddingTop: 10, fontSize: 20 }}
                  text="₹"
                />
              }
              label="Price"
              inputMode="numeric"
              value={price}
              mode="outlined"
              onChangeText={(text: any) => setPrice(parseInt(text))}
            />
            {/* UNITS */}
            <TextInput
              style={{ flex: 1, height: 60, backgroundColor }}
              outlineStyle={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.colors.disabled,
              }}
              left={
                <TextInput.Icon
                  style={{ paddingTop: 10 }}
                  icon={() => (
                    <MaterialIcons
                      name="stacked-bar-chart"
                      size={24}
                      color={theme.colors.placeholder}
                    />
                  )}
                />
              }
              inputMode="numeric"
              label="Units"
              value={availableUnits}
              mode="outlined"
              onChangeText={(text) => setAvailableUnits(parseInt(text))}
            />
          </StyledView>
          {/* DESCRIPTION */}
          <TextInput
            style={{ width: "100%", backgroundColor }}
            outlineStyle={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: theme.colors.disabled,
            }}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons
                    name="description"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Product Description"
            multiline
            numberOfLines={5}
            value={desc}
            mode="outlined"
            onChangeText={(text) => setDesc(text)}
          />
        </StyledView>

        {/* HEADER TEXT - OPTIONS */}
        <HeaderSection
          heading="Options"
          subHeading="Specify options for this product"
        />

        {/* INPUTS - 2 */}
        <StyledView style={{ width: "100%", gap: 25 }}>
          {/* DELIVERY RADIUS */}
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
                  <MaterialIcons
                    name="my-location"
                    size={24}
                    color={theme.colors.placeholder}
                  />
                )}
              />
            }
            label="Delivery Radius"
            placeholder=" ~ Within Srinagar"
            value={deliveryRadius}
            mode="outlined"
            onChangeText={(text) => setDeliveryRadius(text)}
          />

          {/* COD SWITCH */}
          <StyledView
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingVertical: 10,
            }}
          >
            <StyledView
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MaterialIcons
                name="attach-money"
                size={24}
                color={theme.colors.text}
              />
              <StyledText style={{ color: theme.colors.text, fontSize: 15 }}>
                Cash on Delivery ?
              </StyledText>
            </StyledView>
            <Switch
              value={cashOnDelivery}
              onValueChange={() => setCashOnDelivery(!cashOnDelivery)}
            />
          </StyledView>

          {/* IS RETURNABLE SWITCH */}
          <StyledView
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingVertical: 10,
            }}
          >
            <StyledView
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Ionicons
                name="return-down-back"
                size={24}
                color={theme.colors.text}
              />
              <StyledText style={{ color: theme.colors.text, fontSize: 15 }}>
                Is Returnable ?
              </StyledText>
            </StyledView>
            <Switch
              value={isReturnable}
              onValueChange={() => setIsReturnable(!isReturnable)}
            />
          </StyledView>
        </StyledView>

        {/* BUTTON */}
        <Pressable
          //   disabled={isLoading ? true : false}
          //   onPress={() => HandleSubmit()}
          style={{
            flex: 1,
            width: screenWidth,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            marginBottom: 25,
            backgroundColor: theme.colors.primary,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={25} color={theme.colors.background} />
          ) : (
            <StyledText
              style={{ fontSize: 20, color: theme.colors.background }}
            >
              Add Product
            </StyledText>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddProducts;
