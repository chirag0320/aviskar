import { createSlice } from "@reduxjs/toolkit";
import { appCreateAsyncThunk } from "../middleware/thunkMiddleware";
import MyVaultServices from "@/apis/services/MyVaultServices";
import { Account, AccountQuery, Address, AddressQuery } from "@/types/myVault";
import { string } from "prop-types";

interface MyVaultInitialState {
    loading: boolean,
    accounts: Account[] | null,
    addresses: Address[] | null
}

const initialState: MyVaultInitialState = {
    loading: false,
    accounts: null,
    addresses: null
}

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

export const myVaultSlice = createSlice({
    name: "myVault",
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        }
    },
    extraReducers: (builder) => {
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
    }
})

export const { setLoadingTrue, setLoadingFalse } = myVaultSlice.actions;

export default myVaultSlice.reducer;