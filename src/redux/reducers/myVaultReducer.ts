import { createSlice } from "@reduxjs/toolkit";
import { appCreateAsyncThunk } from "../middleware/thunkMiddleware";
import MyVaultServices from "@/apis/services/MyVaultServices";
import { Account, AccountQuery, Address, AddressQuery, rewardPointsHistoryData, rewardPointsHistoryDataItems, IOrderHistoryApiResponseData, IConfigDropdown } from "@/types/myVault";
interface ValueFacturation {
    low: number;
    high: number;
    current: number;
    position: number;
    move: number;
    percentage: number;
    linechartdata: number[];
    linechartdata2: Array<[number, number, number]>;
}
interface ImyVaultHomePageChartData {
    totalValueFacturation: ValueFacturation;
    goldValueFacturation: ValueFacturation;
    silverValueFacturation: ValueFacturation;
    totalDayRangeValueFacturation: ValueFacturation;
    goldDayRangeValueFacturation: ValueFacturation;
    silverDayRangeValueFacturation: ValueFacturation;
}
interface MyVaultInitialState {
    loading: boolean,
    configDropdowns: IConfigDropdown | null,
    accounts: Account[] | null,
    addresses: Address[] | null,
    buyBackOrderHistory: IOrderHistoryApiResponseData | null,
    rewardPointsHistory: rewardPointsHistoryData | null,
    orderHistory: IOrderHistoryApiResponseData | null,
    myVaultHomePageData: DashboardData | null,
    myVaultHomePageChartData: ImyVaultHomePageChartData | null;
}
export interface IRecentOrders {
    orderId: number;
    orderGuid: string;
    customOrderNumber: string;
    orderTotal: number;
    billingAddressId: number;
    shippingAddressId: number;
    orderStatusId: number;
    alertOrderStatusId: number;
    shippingStatusId: number;
    paymentStatusId: number;
    paymentMethodSystemName: string;
    customerId: number;
    orderCustomerId: number;
    shippingMethod: string;
    accountType: string;
    accountName: string;
    createdOnUtc: string;
    orderStatus: string;
    orderStatusColor: string;
    alertOrderStatus: any; // You may need to define a type for this
    alertOrderStatusColor: any; // You may need to define a type for this
}
export interface DashboardData {
    dashboards: {
        title: string;
        count: number;
    }[];
    sliders: {
        myVaultEvaPeakSliderId: number;
        storeCode: number;
        displayOrder: number;
        sliderTime: number;
        cdnUrlLarge: string;
        cdnUrlSmall: string;
    }[];
    customerInformation: {
        customerId: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    };
    recentOrders: IRecentOrders[];
    newsLetterDescription: string;
    availableRewardPoints: number;
    isRecentlyOrdersExist: boolean;
    Addresses: string ;
    "Buyback Order": string ;
    Customers:string ;
    Order:string ;
    "Reward Point":string ;
}

const initialState: MyVaultInitialState = {
    loading: false,
    configDropdowns: null,
    accounts: null,
    addresses: null,
    rewardPointsHistory: null,
    buyBackOrderHistory: null,
    orderHistory: null,
    myVaultHomePageData: null,
    myVaultHomePageChartData: null
}

// CONFIG DROPDOWNS
export const getConfigDropdowns = appCreateAsyncThunk(
    "getConfigDropdowns",
    async ({ url }: { url: string }) => {
        return await MyVaultServices.getConfigDropdowns(url);
    }
)

// ACCOUNTS
export const getAccounts = appCreateAsyncThunk(
    "getAccounts",
    async ({ url }: { url: string }) => {
        return await MyVaultServices.getAccounts(url);
    }
)

export const addOrEditAccount = appCreateAsyncThunk(
    "addOrEditAccount",
    async ({ url, body }: { url: string, body: any }) => {
        return await MyVaultServices.addOrEditAccount(url, body);
    }
)

// REWARD POINTS HISTORY
export const getRewardPointsHistory = appCreateAsyncThunk(
    "getRewardPointsHistory",
    async ({ url, body }: { url: string, body: any }) => {
        return await MyVaultServices.getRewardPointsHistory(url, body);
    }
)

// ORDER HISTORY
export const getOrderHistory = appCreateAsyncThunk(
    "getOrderHistory",
    async ({ url, body }: { url: string, body: any }) => {
        return await MyVaultServices.getOrderHistory(url, body);
    }
)

// ADDRESSES
export const getAddresses = appCreateAsyncThunk(
    "getAddresses",
    async ({ url }: { url: string }) => {
        return await MyVaultServices.getAddresses(url);
    }
)

export const addOrEditAddresses = appCreateAsyncThunk(
    "addOrEditAddresses",
    async ({ url, body }: { url: string, body: AddressQuery }) => {
        return await MyVaultServices.addOrEditAddresses(url, body);
    }
)

export const deleteAddress = appCreateAsyncThunk(
    "deleteAddress",
    async ({ url }: { url: string }) => {
        return await MyVaultServices.deleteAddress(url);
    }
)

// BUY BACK ORDER HISTORY
export const getBuyBackOrderHistory = appCreateAsyncThunk(
    "getBuyBackOrderHistory",
    async ({ url, body }: { url: string, body: any }) => {
        return await MyVaultServices.getBuyBackOrderHostory(url, body);
    }
)

// My vault home page data
export const getMyVaultHomePageData = appCreateAsyncThunk(
    "getMyVaultHomePageData",
    async () => {
        return await MyVaultServices.getMyVaultHomePageData();
    }
)
// My vault home page data chart
export const getMyVaultHomePageChartData = appCreateAsyncThunk(
    "getMyVaultHomePageChartData",
    async () => {
        return await MyVaultServices.getMyVaultHomePageChartData();
    }
)
export const myVaultSlice = createSlice({
    name: "myVault",
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        updateAddress: (state, action) => {
            const { addressId, addressTypeId, customerId, firstName, lastName, addressLine1, addressLine2, city, stateId, postcode, countryId, phoneNumber, email, isSource, isVerified, stateName, countryName, addressType, orderStatusId } = action.payload;

            state.addresses = state.addresses?.map((address) => {
                if (address.addressId === addressId) {
                    return {
                        addressId,
                        addressTypeId,
                        customerId,
                        firstName,
                        lastName,
                        addressLine1,
                        addressLine2,
                        city,
                        stateId,
                        postcode,
                        countryId,
                        phoneNumber,
                        email,
                        isSource,
                        isVerified,
                        stateName,
                        countryName,
                        addressType,
                        orderStatusId
                    }
                }
                return address;
            }) ?? null;
        },
        addAddress: (state, action) => {
            state.addresses = [...state.addresses!, action.payload]
        }
    },
    extraReducers: (builder) => {
        // get config dropdowns
        builder.addCase(getConfigDropdowns.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getConfigDropdowns.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.configDropdowns = responseData.data;
            state.loading = false;
        })
        builder.addCase(getConfigDropdowns.rejected, (state) => {
            state.loading = false;
        })

        // get accounts
        builder.addCase(getAccounts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAccounts.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.accounts = responseData.data;
            state.loading = false;
        })
        builder.addCase(getAccounts.rejected, (state) => {
            state.loading = false;
        })

        // add or edit accounts
        builder.addCase(addOrEditAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addOrEditAccount.fulfilled, (state, action) => {
            // const responseData = action.payload.data;
            // state.accounts = responseData.data;
            state.loading = false;
        })
        builder.addCase(addOrEditAccount.rejected, (state) => {
            state.loading = false;
        })

        // get addresses
        builder.addCase(getAddresses.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAddresses.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.addresses = responseData.data;
            state.loading = false;
        })
        builder.addCase(getAddresses.rejected, (state) => {
            state.loading = false;
        })

        // add or edit addresses
        builder.addCase(addOrEditAddresses.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addOrEditAddresses.fulfilled, (state, action) => {
            // const responseData = action.payload.data;
            // state.accounts = responseData.data;
            state.loading = false;
        })
        builder.addCase(addOrEditAddresses.rejected, (state) => {
            state.loading = false;
        })

        // delete address
        builder.addCase(deleteAddress.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            const responseData = action.payload.data;

            if (responseData?.data === true) {
                const addressId = action.payload.config.url?.split("/")[2];
                if (!addressId) {
                    state.loading = false;
                    return;
                }
                state.addresses = state.addresses?.filter((address) => address.addressId !== parseInt(addressId)) ?? null;
            }

            state.loading = false;
        })
        builder.addCase(deleteAddress.rejected, (state) => {
            state.loading = false;
        })
        // reward points history
        builder.addCase(getRewardPointsHistory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getRewardPointsHistory.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.rewardPointsHistory = responseData.data;
            state.loading = false;
        })
        builder.addCase(getRewardPointsHistory.rejected, (state) => {
            state.loading = false;
        })

        // get buy back order history data
        builder.addCase(getBuyBackOrderHistory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getBuyBackOrderHistory.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.buyBackOrderHistory = responseData.data;
            state.loading = false;
        })
        builder.addCase(getBuyBackOrderHistory.rejected, (state) => {
            state.loading = false;
        });

        // order history
        builder.addCase(getOrderHistory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getOrderHistory.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.orderHistory = responseData.data;
            state.loading = false;
        })
        builder.addCase(getOrderHistory.rejected, (state) => {
            state.loading = false;
        })
        // my vault home page data
        builder.addCase(getMyVaultHomePageData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMyVaultHomePageData.fulfilled, (state, action) => {
            const responseData = action.payload.data.data;
            const dashboards = responseData?.dashboards?.reduce((acc: any, item: any) => {
                acc[item.title] = item.count.toString();
                return acc;
            }, {});
            state.myVaultHomePageData = {
                ...responseData,
                ...dashboards,
            };
            state.loading = false;
        })
        builder.addCase(getMyVaultHomePageData.rejected, (state) => {
            state.loading = false;
        })
        // my vault home page chart data
        builder.addCase(getMyVaultHomePageChartData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMyVaultHomePageChartData.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.myVaultHomePageChartData = responseData.data;
            state.loading = false;
        })
        builder.addCase(getMyVaultHomePageChartData.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { setLoadingTrue, setLoadingFalse, updateAddress, addAddress } = myVaultSlice.actions;

export default myVaultSlice.reducer;