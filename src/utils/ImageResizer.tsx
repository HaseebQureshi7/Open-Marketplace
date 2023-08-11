import * as ImageManipulator from "expo-image-manipulator";

const compressImage = async (base64Image: any) => {
  // Get the image data from base64 format
  const imageData = `data:image/jpeg;base64,${base64Image}`;

  // Get the original image size in kilobytes
  const originalSize = Math.round(base64Image.length / 1024);

  // Compress the image using Expo's ImageManipulator
  const compressedImage: any = await ImageManipulator.manipulateAsync(
    imageData,
    [{ resize: { width: 800 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  );

  // Get the compressed image size in kilobytes
  const compressedSize = Math.round(compressedImage.base64.length / 1024);

  // Log the previous size and the size after compression
  console.log(`Previous Size: ${originalSize} KB`);
  console.log(`Compressed Size: ${compressedSize} KB`);

  // Return the compressed image in base64 format
  return compressedImage.base64;
};

export default compressImage;
