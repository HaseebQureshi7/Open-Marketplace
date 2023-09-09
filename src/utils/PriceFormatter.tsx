export const FormatPriceWithCommas = (price: number): string => {
  return price?.toLocaleString("en-IN");
};
