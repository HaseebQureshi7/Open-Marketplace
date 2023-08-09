import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetUserType = async () => {
  const ds = await AsyncStorage.getAllKeys();
  if (ds.includes("business")) {
    return "Business";
  } else if (ds.includes("customer")) {
    return "Customer";
  } else {
    return "no-user";
  }
};
