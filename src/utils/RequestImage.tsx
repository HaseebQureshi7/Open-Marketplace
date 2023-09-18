import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import compressImage from "../utils/ImageResizer";

export const RequestImage = async () => {
  try {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!res.canceled) {
      let result;
      const imageUri = res.assets[0].uri;
      const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return compressImage(base64Data)
        .then((res: any) => {
          result = res;
          return res;
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
