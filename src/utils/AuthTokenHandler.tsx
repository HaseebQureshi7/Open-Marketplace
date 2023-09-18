import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save token to AsyncStorage
export async function SaveTokenToLS(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

// Function to retrieve token from AsyncStorage
export async function GetTokenFromLS(): Promise<string | null> {
  return AsyncStorage.getItem("token").then((res: any) => {
    return res;
  });
}
