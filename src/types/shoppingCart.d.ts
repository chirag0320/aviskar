export interface CartItem {
    id: number;
    shoppingCartTypeId: number;
    customerId: number;
    productId: number;
    storeCode: number;
    quantity: number;
    productName: string;
    shortDescription: string;
    friendlypagename: string;
    imageUrl: string;
    productPrice: number;
    premiumDiscount: number;
    productWeight: number;
    parentProductId: number;
    colorClass: string;
    iconClass: string;
    availability: string;
    shippingInfo: string;
    stock: number;
    shippingMethod: number[];
    shippableCountrys: number[];
    warnings? : string[];
}
