import AsyncStorage from "@react-native-async-storage/async-storage";

export function AddToWishlist(item: any) {
  //   console.log("item -> ", item);

  AsyncStorage.getItem("Wishlist")
    .then((res) => {
      //   console.log("Wishlist -> ", res);
      const wishlistArray: Array<any> = res ? JSON.parse(res) : [];

      const itemIndex = wishlistArray.findIndex(
        (wishlistItem: any) => wishlistItem.id === item.id
      );

      if (itemIndex !== -1) {
        // Item already exists, remove it from the array
        wishlistArray.splice(itemIndex, 1);
        // console.log("Item removed from wishlist");
      } else {
        // Item doesn't exist, add it to the array
        wishlistArray.push(item);
        // console.log("Item added to wishlist");
      }

      AsyncStorage.setItem("Wishlist", JSON.stringify(wishlistArray))
        .then(() => {
          //   console.log("Wishlist updated");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function GetWishlist(): Promise<any[]> {
  return AsyncStorage.getItem("Wishlist")
    .then((res) => {
      if (res === null) {
        return [];
      } else {
        const wishlistArray: Array<any> = JSON.parse(res);
        return wishlistArray;
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export function RemoveFromWishlist(productId: string) {
  AsyncStorage.getItem("Wishlist")
    .then((res) => {
      if (res !== null) {
        const wishlistArray: Array<any> = JSON.parse(res);
        const itemIndex = wishlistArray.findIndex(
          (wishlistItem) => wishlistItem.id === productId
        );
        if (itemIndex !== -1) {
          // Item found, remove it from the array
          wishlistArray.splice(itemIndex, 1);
          AsyncStorage.setItem("Wishlist", JSON.stringify(wishlistArray))
            .then(() => {
              //   console.log("Item removed from wishlist");
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Item not found in wishlist");
        }
      } else {
        console.log("Wishlist is empty");
      }
    })
    .catch((err) => console.log(err));
}
