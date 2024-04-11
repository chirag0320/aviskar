// ACCOUNTS

interface AdditionalBeneficiary {
    customerAdditionalBeneficiaryId: number;
    firstName: string;
    lastName: string;
}

export interface AddressQuery {
    addressId?: number;
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
    isVerified: boolean;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateId: number;
    stateName: string;
    postcode: number;
    countryId: number;
}

export interface AccountQuery {
    customerId: number;
    accountTypeId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    state: number;
    country: number;
    businessName: string;
    superfundName: string;
    trusteeTypeId: number;
    trusteeName: string;
    trustName: string;
    additionalBeneficiary: AdditionalBeneficiary[];
    address: AddressQuery;
}

export interface Address {
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

export interface Account {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    billingAddressId: number | null;
    accountType: string;
    accountName: string;
    accountNumber: number | null;
    masterCustomerId: number | null;
    address: Address;
}

// REWARD POINTS HISTORY
export interface rewardPointsHistoryData {
    extraProperty: any | null;
    count: number;
    page: number;
    pageSize: number;
    items: rewardPointsHistoryDataItems[];
    additionalField: any | null;
}

export interface rewardPointsHistoryDataItems {
    id: number;
    customerId: number;
    storeCode: number;
    points: number;
    pointsBalance: number;
    usedAmount: number;
    message: string;
    createdOnUtc: string;
    endDateUtc: string;
    validPoints: number;
}

// ORDER HISTORY
export interface IOrderHistoryData {
    search: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;
    filters: IOrderHistoryDataFilters;
}

export interface IOrderHistoryDataFilters {
    fromDate: Date;
    toDate: Date;
    orderStatusId: number;
    orderCustomerId: number;
}

// export interface IOrderHistoryItems {
//     accountName: string;
//     accountType: string;
//     alertOrderStatus: null | string;
//     alertOrderStatusId: number;
//     billingAddressId: number;
//     createdOnUtc: string; // Assuming this is a date string
//     customOrderNumber: string;
//     customerId: number;
//     orderCustomerId: number;
//     orderGuid: string;
//     orderId: number;
//     orderStatus: string;
//     // orderStatusColor : string;
//     orderStatusId: number;
//     paymentMethodSystemName: null | string;
//     paymentStatusId: number;
//     shippingAddressId: number;
//     shippingMethod: string;
//     shippingStatusId: number;
//     storeCode: number;
//   }

export interface IOrderHistoryItems {
    orderId: number;
    orderGuid: string;
    customOrderNumber: string;
    storeCode: number;
    billingAddressId: number;
    shippingAddressId: number;
    orderStatusId: number;
    alertStatusId: number;
    shippingStatusId: number;
    paymentStatusId: number;
    paymentMethodSystemName: string;
    customerId: number;
    orderCustomerId: number;
    orderTotal : number;
    shippingMethod: string;
    accountType: string;
    accountName: string;
    createdOnUtc: string;
    orderStatus: string;
    orderStatusColor: string;
    alertStatus: string | null;
    alertStatusColor: string | null;
}

export interface IOrderHistoryApiResponseData {
    additionalField: any | null;
    count: number;
    extraProperty: any | null;
    items: IOrderHistoryItems[];
    page: number;
    pageSize: number;
}

// ADDRESSES

