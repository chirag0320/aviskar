import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import { OrderDetails } from '@/types/orderDetails'
import OrderDetailsServices from '@/apis/services/orderDetailsServices'
// Services

const initialState: { loading: boolean, orderHistoryDetailData: OrderDetails | null } = {
    loading: false,
    orderHistoryDetailData: null
}

export const getOrderHistoryDetailData = appCreateAsyncThunk(
    "getOrderHistoryDetailData",
    async ({ url }: { url: string }) => {
        return await OrderDetailsServices.getOrderHistoryDetailData(url);
    }
)

export const orderDetailsPageSlice = createSlice({
    name: 'orderDetailsPage',
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
        //get order details data
        builder.addCase(getOrderHistoryDetailData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getOrderHistoryDetailData.fulfilled, (state, action) => {
            const responseData = action?.payload?.data?.data;
            state.orderHistoryDetailData = responseData;
            state.loading = false;
        })
        builder.addCase(getOrderHistoryDetailData.rejected, (state, action) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse } = orderDetailsPageSlice.actions;

export default orderDetailsPageSlice.reducer
