interface Address {
    addressId: number;
    addressTypeId: number;
    customerId: number;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateId: number;
    postcode: number;
    countryId: number;
    phoneNumber: string;
    email: string;
    isSource: string;
    isVerified: boolean;
    stateName: string;
    countryName: string;
    addressType: string;
    orderStatusId: number | null;
}

interface EvaInvoiceManagerValues {
    [key: string]: string | null;
}

export interface OrderDetails {
    orderId: number;
    orderGuid: string;
    customOrderNumber: string;
    storeCode: number;
    billingAddressId: number;
    shippingAddressId: number;
    orderStatusId: number;
    orderStatus: string;
    shippingStatusId: number;
    paymentStatusId: number;
    paymentMethodSystemName: string;
    orderCustomerId: number;
    shippingMethod: string;
    paymentMethod: string;
    accountType: string;
    accountName: string;
    createdOnUtc: string;
    orderDate: string;
    orderTime: string;
    orderSubtotalInclTax: number;
    orderSubtotalExclTax: number;
    orderSubTotalDiscountInclTax: number;
    orderSubTotalDiscountExclTax: number;
    orderShippingInclTax: number;
    orderShippingExclTax: number;
    paymentMethodAdditionalFeeInclTax: number;
    paymentMethodAdditionalFeeExclTax: number;
    orderTax: number;
    orderDiscount: number;
    orderTotal: number;
    addresses: Address[];
    orderItems: any[]; 
    evaInvoiceManagerValues: EvaInvoiceManagerValues;
}
