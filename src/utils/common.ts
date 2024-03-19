export const stockUpdate: any = {
  availableStock: 'We only have few items left for some products as listed below. Kindly adjust your cart quantity(s) accordingly.',
  validationHeader: 'Your order is not placed due to some reason mentioned below.'
}

export const deliveryMethodMessage = {
  noShippingAtAddress: 'This product is currently not being shipped to Canada.',
  noSecureShipping: 'This product is not available for Secured Shipping.'
}

export const stockStatus: any = {
  profit: 'profit',
  loss: 'loss',
}
export function formatDate(dateString: any) {
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export function progressBarLogic({ currentprice, min, max }: any) {
  console.log("🚀 ~ progressBarLogic ~ {currentprice,min,max}:", { currentprice, min, max }, 'calcualted price', ((currentprice - min) / (max - min)) * 100)
  return ((currentprice - min) / (max - min)) * 100
}

export function valueChangeForPrice({ currentprice, yesterdayprice }: { currentprice: number, yesterdayprice: number }) {
  return (((currentprice - yesterdayprice) / yesterdayprice) * 100).toFixed(2)
}