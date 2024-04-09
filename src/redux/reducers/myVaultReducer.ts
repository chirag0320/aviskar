import { createSlice } from "@reduxjs/toolkit";
import { appCreateAsyncThunk } from "../middleware/thunkMiddleware";
import MyVaultServices from "@/apis/services/MyVaultServices";
import { Account, AccountQuery, Address, AddressQuery, rewardPointsHistoryData, rewardPointsHistoryDataItems, IOrderHistoryApiResponseData, IConfigDropdown } from "@/types/myVault";

interface MyVaultInitialState {
    loading: boolean,
    configDropdowns: IConfigDropdown | null,
    accounts: Account[] | null,
    addresses: Address[] | null,
    buyBackOrderHistory: IOrderHistoryApiResponseData | null,
    rewardPointsHistory: rewardPointsHistoryData | null,
    orderHistory: IOrderHistoryApiResponseData | null
}

const initialState: MyVaultInitialState = {
    loading: false,
    configDropdowns: null,
    accounts: null,
    addresses: null,
    rewardPointsHistory: null,
    buyBackOrderHistory: null,
    orderHistory: null
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
    async ({ url, body }: { url: string, body: AccountQuery }) => {
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
    }
})

export const { setLoadingTrue, setLoadingFalse, updateAddress, addAddress } = myVaultSlice.actions;

export default myVaultSlice.reducer;