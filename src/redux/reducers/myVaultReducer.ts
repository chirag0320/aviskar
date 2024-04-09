import { createSlice } from "@reduxjs/toolkit";
import { appCreateAsyncThunk } from "../middleware/thunkMiddleware";
import MyVaultServices from "@/apis/services/MyVaultServices";
import { Account, AccountQuery, rewardPointsHistoryData, IOrderHistoryApiResponseData } from "@/types/myVault";

interface MyVaultInitialState {
    loading: boolean,
    accounts: Account[] | null,
    rewardPointsHistory: rewardPointsHistoryData | null,
    orderHistory: IOrderHistoryApiResponseData | null
}

const initialState: MyVaultInitialState = {
    loading: false,
    accounts: null,
    rewardPointsHistory: null,
    orderHistory: null
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

// REWARD POINTS HISTORY
export const getRewardPointsHistory = appCreateAsyncThunk(
    "getRewardPointsHistory",
    async({ url, body } : { url: string, body: any }) => {
        return await MyVaultServices.getRewardPointsHistory(url, body);
    }
)

// ORDER HISTORY
export const getOrderHistory = appCreateAsyncThunk(
    "getOrderHistory",
    async({ url, body } : { url: string, body: any }) => {
        return await MyVaultServices.getOrderHistory(url, body);
    }
)

// ADDRESSES

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

export const {setLoadingTrue,setLoadingFalse} = myVaultSlice.actions;

export default myVaultSlice.reducer;