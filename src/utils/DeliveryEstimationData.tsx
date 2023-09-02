function GetEstDeliveryDate() {
  const today = new Date();
  const futureDate = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);

  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);

  return formattedDate;
}

export default GetEstDeliveryDate;
