import React from "react";
import axios from "axios";
import { baseUrl } from "../utils/localENV";
import { ActivityIndicator } from "react-native-paper";

const ReturnProdCategory = ({ category }: { category: string }) => {
  const [catName, setCatName] = React.useState();

  React.useEffect(() => {
    axios
      .get(baseUrl + `/category/getCategoryById/${category}`)
      .then((res) => setCatName(res.data.name));
  }, []);
  if (catName) {
    return catName;
  } else {
    return <ActivityIndicator />;
  }
};

export default ReturnProdCategory;
