export const priceFormat = (stringPrice: string) => {
  const numberPrice = +stringPrice.replace(/[^0-9]/g, '');

  const formattedPrice = numberPrice
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  return formattedPrice;
};
