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
import React, { useContext } from "react";
import { screenWidth } from "../../utils/Dimensions";
import { RequestImage } from "../../utils/RequestImage";
import { baseUrl } from "../../utils/localENV";
import axios from "axios";
import { SnackStateProps } from "../../types/SnackbarTypes";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserDataContext } from "../../context/UserDataContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTokenFromLS } from "../../utils/AuthTokenHandler";
import { UserTokenContext } from "../../context/UserTokenContext";
import { AuthToken } from "../../utils/AuthToken";
import { Picker } from "@react-native-picker/picker";
import { Districts } from "../../utils/Districts";

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

  const [allCategories, setAllCategories] = React.useState<Array<any>>([]);
  const [category, setCategory] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [productImage, setProductImage] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [availableUnits, setAvailableUnits] = React.useState<number | any>(0);
  const [deliveryRadius, setDeliveryRadius] = React.useState<string>("");
  const [cashOnDelivery, setCashOnDelivery] = React.useState<boolean>(false);
  const [isReturnable, setIsReturnable] = React.useState<boolean>(false);

  const { snackData, setSnackData }: SnackStateProps =
    useContext(SnackbarContext);

  const queryClient = useQueryClient();

  const { userData, setUserData }: any = useContext(UserDataContext);
  const { userToken, setUserToken }: any = useContext(UserTokenContext);

  const UpdateImage = () => {
    RequestImage().then((res: any) => {
      setProductImage(res);
    });
  };

  const getAllCategories = (addProdData: any) => {
    return axios.get(baseUrl + "/category/getAllCategories");
  };

  const {} = useQuery(["All Categories"], getAllCategories, {
    onSuccess: (data) => {
      // console.log(data.data.length);
      setAllCategories(data.data);
    },
  });

  const addProdQuery = (addProdData: any) => {
    return axios.post(baseUrl + "/product/createProduct", addProdData);
  };

  const { mutate, isLoading } = useMutation(addProdQuery, {
    onSuccess: () => {
      setSnackData({
        open: true,
        severity: "Success",
        text: "Product Added!",
      });
      navigation.navigate("dashboard");
      queryClient.invalidateQueries(["All Business Products"]);
    },
    onError: (e) => {
      setSnackData({
        open: true,
        severity: "Error",
        text: "Something went wrong!",
      });
    },
  });

  function HandleAddProd() {
    if (
      productImage &&
      name.length > 3 &&
      price > 2 &&
      availableUnits >= 1 &&
      desc.length > 5 &&
      deliveryRadius.length > 3
    ) {
      const addProdData = {
        name,
        price,
        sellerId: userData?.id,
        category: categoryId,
        description: desc,
        availableUnits,
        productImage,
        deliveryRadius,
        cashOnDelivery,
        isReturnable,
      };

      mutate(addProdData);
    } else {
      setSnackData({
        open: true,
        severity: "Warning",
        text: "Provide all details!",
      });
    }
  }

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
            {productImage ? null : (
              <StyledText style={{ color: theme.colors.text }}>
                Add Image
              </StyledText>
            )}
          </View>
          {/* PLACEHOLDER || SELECTED IMAGE */}
          <Image
            style={{
              width: "100%",
              height: 400,
              opacity: productImage ? 1 : 0.2,
            }}
            source={
              productImage
                ? { uri: "data:productImage/png;base64," + productImage }
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

          {/* CATEGORY */}
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
              selectedValue={category}
              onValueChange={(itemValue: any) => {
                setCategory(itemValue);

                let selectedCategory = allCategories?.find(
                  (data: any) => itemValue === data.name
                );

                if (selectedCategory) {
                  setCategoryId(selectedCategory.id);
                }
              }}
            >
              <Picker.Item label="Select Category" enabled={false} />
              <Picker.Item label="+ Add Category" />
              {allCategories?.map((category: any) => {
                return (
                  <Picker.Item
                    // style={{ color: theme.colors.placeholder }}
                    key={category.id}
                    label={category.name}
                    value={category.name}
                  />
                );
              })}
            </Picker>
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
          onPress={() => HandleAddProd()}
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
