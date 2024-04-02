import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ContactUsServices from '@/apis/services/ContactUsServices'
import { ConfigDetails, ContactUsFormDetails, Reason } from '@/types/contactUs'
import { isBrowser, localStorageGetItem, localStorageSetItem } from '@/utils/common'
import OrderConfirmationDetailsServices from '@/apis/services/OrderConfirmationDetails'
// Services

interface OrderDetails {
    loading: boolean,
    orderId: number | null;
    orderDate: string | null;
    orderTime: string | null;
    orderNumber: string | null;
    orderItems: OrderItem[];
    totalPaymentAmount: number | null;
}


interface OrderItem {
    productId: number;
    parentProductId: number;
    quantity: number;
    productName: string;
    imageUrl: string;
    unitPrice: number;
    subTotal: number;
}

interface Order {
    orderId: number;
    orderDate: string;
    orderTime: string;
    orderNumber: string;
    orderTotal: number;
    orderItems: OrderItem[];
}
const initialState: OrderDetails = {
    loading: false,
    orderId: null,
    orderDate: null,
    orderTime: null,
    orderNumber: null,
    orderItems: [],
    totalPaymentAmount: null
}

export const getOrderConfirmationDetails = appCreateAsyncThunk(
    "getOrderConfirmationDetails",
    async ({ url }: { url: string }) => {
        return await OrderConfirmationDetailsServices.getOrderConfimationDetails(url);
    }
)

export const orderConfirmationDetailsPageSlice = createSlice({
    name: 'orderConfirmationDetailsPage',
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
        // get order confirmation details
        builder.addCase(getOrderConfirmationDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getOrderConfirmationDetails.fulfilled, (state, action) => {
            const responseData: Order = action.payload.data?.data;

            if (!responseData) return;
            state.orderId = responseData?.orderId;
            state.orderDate = responseData?.orderDate;
            state.orderTime = responseData?.orderTime;
            state.orderNumber = responseData?.orderNumber;
            state.orderItems = responseData?.orderItems;
            state.totalPaymentAmount = responseData?.orderTotal
            state.loading = false;
        })
        builder.addCase(getOrderConfirmationDetails.rejected, (state) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse } = orderConfirmationDetailsPageSlice.actions;

export default orderConfirmationDetailsPageSlice.reducer
