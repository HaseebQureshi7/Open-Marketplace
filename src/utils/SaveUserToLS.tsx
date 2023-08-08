import AsyncStorage from "@react-native-async-storage/async-storage";

interface CustomerData {
  email?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  password?: string;
  phone?: string;
}

// Function to save customer data to AsyncStorage
export async function SaveCustomerToLS(data: CustomerData): Promise<void> {
  try {
    const dataJSON = JSON.stringify(data);
    await AsyncStorage.setItem("customer", dataJSON);
  } catch (error) {
    console.error("Error saving customer data:", error);
  }
}

// Function to retrieve customer data from AsyncStorage
export async function GetCustomerFromLS(): Promise<CustomerData | null> {
  try {
    const dataJSON = await AsyncStorage.getItem("customer");
    if (dataJSON) {
      const customerData: CustomerData = JSON.parse(dataJSON);
      return customerData;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving customer data:", error);
    return null;
  }
}

// Function to save business data to AsyncStorage
export async function SaveBusinessToLS(data: CustomerData): Promise<void> {
  try {
    const dataJSON = JSON.stringify(data);
    await AsyncStorage.setItem("business", dataJSON);
  } catch (error) {
    console.error("Error saving business data:", error);
  }
}

// Function to retrieve customer data from AsyncStorage
export async function GetBusinessFromLS(): Promise<CustomerData | null> {
  try {
    const dataJSON = await AsyncStorage.getItem("business");
    if (dataJSON) {
      const businessData: CustomerData = JSON.parse(dataJSON);
      return businessData;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving business data:", error);
    return null;
  }
}
