import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import { OrderDetails } from '@/types/orderDetails'
import OrderDetailsServices from '@/apis/services/orderDetailsServices'
// Services

const initialState: {
    loading: boolean, orderDetailsData: OrderDetails | null, isOrderFound: boolean | null, shippingMethods: {
        "Local pick up": boolean,
        "Secure Shipping": boolean,
        "Vault storage": boolean

    }
} = {
    loading: false,
    orderDetailsData: null,
    isOrderFound: null,
    shippingMethods: {
        "Local pick up": false,
        "Secure Shipping": false,
        "Vault storage": false
    }
}

export const getOrderDetailsData = appCreateAsyncThunk(
    "getOrderDetailsData",
    async ({ url }: { url: string }) => {
        return await OrderDetailsServices.getOrderDetailsData(url);
    }
)

export const downloadOrderInvoice = appCreateAsyncThunk(
    "downloadOrderInvoice",
    async ({ url }: { url: string }) => {
        return await OrderDetailsServices.downloadOrderInvoice(url);
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
        builder.addCase(getOrderDetailsData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getOrderDetailsData.fulfilled, (state, action) => {
            const responseData = action?.payload?.data?.data;
            if (!responseData) {
                state.loading = false;
                state.isOrderFound = false;
                return;
            }
            responseData.orderItems.forEach((item: any) => {
                state.shippingMethods[item.shippingMethod as keyof typeof state.shippingMethods] = true;
            });
            state.orderDetailsData = responseData;
            state.loading = false;
        })
        builder.addCase(getOrderDetailsData.rejected, (state, action) => {
            state.loading = false;
        })
        //download order invoice
        builder.addCase(downloadOrderInvoice.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(downloadOrderInvoice.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(downloadOrderInvoice.rejected, (state, action) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse } = orderDetailsPageSlice.actions;

export default orderDetailsPageSlice.reducer
