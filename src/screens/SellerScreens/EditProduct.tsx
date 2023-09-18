import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Image, Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Switch,
  TextInput,
  useTheme,
} from "react-native-paper";
import BackButton from "../../components/BackButton";
import HeaderSection from "../../components/HeaderSection";
import { SnackbarContext } from "../../context/SnackbarContext";
import { UserDataContext } from "../../context/UserDataContext";
import { UserTokenContext } from "../../context/UserTokenContext";
import StyledText from "../../styles/styledComponents/StyledText";
import StyledView from "../../styles/styledComponents/StyledView";
import { ThemeInterface } from "../../styles/theme";
import { SnackStateProps } from "../../types/SnackbarTypes";
import { screenWidth } from "../../utils/Dimensions";
import { RequestImage } from "../../utils/RequestImage";
import { baseUrl } from "../../utils/localENV";

const EditProduct = ({
  navigation,
  route,
}: {
  navigation: DrawerNavigationProp<any>;
  route: any;
}) => {
  const theme = useTheme<ThemeInterface>();
  const backgroundColor = "white";

  const product = route.params.props;

  const [name, setName] = React.useState<string>(product?.name);
  const [price, setPrice] = React.useState<any>(product?.price);
  const [sellerId, setSellerId] = React.useState<string>(product?.sellerId);

  const [allCategories, setAllCategories] = React.useState<Array<any>>([]);
  const [category, setCategory] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string>(
    product?.categoryId
  );
  const [productImage, setProductImage] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>(product?.description);
  const [availableUnits, setAvailableUnits] = React.useState<any>(
    product?.availableUnits
  );
  const [deliveryRadius, setDeliveryRadius] = React.useState<string>(
    product?.deliveryRadius
  );
  const [cashOnDelivery, setCashOnDelivery] = React.useState<boolean>(
    product?.cashOnDelivery
  );
  const [isReturnable, setIsReturnable] = React.useState<boolean>(
    product?.isReturnable
  );

  const { setSnackData }: SnackStateProps = useContext(SnackbarContext);

  const queryClient = useQueryClient();

  const { userData }: any = useContext(UserDataContext);
  const { userToken, setUserToken }: any = useContext(UserTokenContext);

  const UpdateImage = () => {
    RequestImage().then((res: any) => {
      setProductImage(res);
    });
  };

  const getAllCategories = () => {
    return axios.get(baseUrl + "/category/getAllCategories");
  };

  const {} = useQuery(["All Categories"], getAllCategories, {
    onSuccess: (data) => {
      setAllCategories(data.data);
    },
  });

  const addProdQuery = (addProdData: any) => {
    return axios.put(
      baseUrl + `/product/editProduct/${product?.id}`,
      addProdData
    );
  };

  const { mutate, isLoading } = useMutation(addProdQuery, {
    onSuccess: () => {
      setSnackData({
        open: true,
        severity: "Success",
        text: "Changes Saved!",
      });
      queryClient
        .invalidateQueries(["All Business Products"])
        .then(() => navigation.navigate("dashboard"))
        .catch((e) => console.log(e));
    },
    onError: () => {
      setSnackData({
        open: true,
        severity: "Error",
        text: "Something went wrong!",
      });
    },
  });

  function HandleEditProd() {
    if (
      (productImage || product?.productImage) &&
      name.length > 3 &&
      price > 2 &&
      availableUnits >= 1 &&
      desc.length > 5 &&
      deliveryRadius.length > 3
    ) {
      const addProdData = {
        // id: product?.id,
        name,
        price,
        sellerId: userData?.id,
        category: categoryId,
        description: desc,
        availableUnits,
        productImage: productImage || product?.productImage,
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
        </StyledView>

        {/* HEADER TEXT - ADD PROD */}
        <HeaderSection
          heading="Edit Product"
          subHeading="Change details for of this product"
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
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name="edit"
              style={{ marginBottom: 10 }}
              size={50}
              color={theme.colors.text}
            />
            <StyledText style={{ color: theme.colors.text }}>
              Change Image
            </StyledText>
          </View>
          {/* PLACEHOLDER || SELECTED IMAGE */}
          <Image
            style={{
              width: "100%",
              height: 400,
              opacity: 1,
            }}
            source={
              productImage
                ? { uri: "data:productImage/png;base64," + productImage }
                : { uri: baseUrl + product?.productImage }
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
              value={price.toString()}
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
              value={availableUnits.toString()}
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
          onPress={() => HandleEditProd()}
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
              Save Changes
            </StyledText>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EditProduct;
