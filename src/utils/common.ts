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
  return ((currentprice - min) / (max - min)) * 100
}

export function valueChangeForPrice({ currentprice, yesterdayprice }: { currentprice: number, yesterdayprice: number }) {
  return (((currentprice - yesterdayprice) / yesterdayprice) * 100).toFixed(2)
}
export function roundOfThePrice(price: number) {
  // return Math.round((price + Number.EPSILON) * 100) / 100
  // return (price).toFixed(2);
  return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
}
export const shipmentTypeToEnum: any = {
  'LocalShipping': 3,
  'SecureShipping': 2,
  'VaultStorage': 1
}
export const shipmentNameEnum: any= {
  'LocalShipping': 'Local Pick Up',
  'SecureShipping': 'Secure Shipping',
  'VaultStorage': 'Vault storage'
}
export const isBrowser = typeof window !== "undefined"
export function localStorageGetItem(key: any) {
  return isBrowser && key ? (localStorage?.getItem(key) === 'undefined' ? undefined : localStorage?.getItem(key)) : undefined
}

export function localStorageSetItem(key: any, value: any) {
  isBrowser && localStorage?.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value)
}
export function hasFulfilled(dataType: string): boolean {
  return dataType.includes('/fulfilled');
}

// Function to store the last page in session storage
export const storeLastPage = (pageUrl:string) => {
  sessionStorage.setItem('lastPage', pageUrl);
};

// Function to retrieve the last page from session storage
export const getLastPage = () => {
  return sessionStorage.getItem('lastPage');
};
export const bodyForGetShoppingCartData={
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {}
}
export function getDefaultOption(enabledOptions:any[], defaultOption:string | number) {
  const enabledValues = enabledOptions.filter(option => option.enabled).map(option => option.value);
  return enabledValues.length > 0 ? enabledValues[0] : defaultOption;
}
export const paymentMethodType:any={
  "CreditCard" : 'Credit Card',
  "BankTransfer" : 'Bank Transfer',
  "Cash" : 'Cash',
}