const formatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: "currency",
  currency: "USD",
});
export const formatPrice = (price) => {
  return formatter.format(price);
};
