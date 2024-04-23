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
    thankyousection: string | null;
    orderdescription: string | null;
    orderTime: string | null;
    orderNumber: string | null;
    orderTotal: number | null;
    shippingFee: number | null;
    vaultStorageFee : number | null;
    paymentFee: number | null;
    orderDiscount: number | null;
    orderTax: number | null;
    subTotal: number | null;
    shippingMethod: string | null;
    paymentMethod: string | null;
    orderItems: any[];
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

const initialState: {
    loading: boolean, orderConfirmationDetailsData: OrderDetails | null, isOrderFound: boolean | null, shippingMethods: {
        "Local pick up": boolean,
        "Secure Shipping": boolean,
        "Vault storage": boolean

    }
} = {
    loading: false,
    orderConfirmationDetailsData: null,
    isOrderFound: null,
    shippingMethods: {
        "Local pick up": false,
        "Secure Shipping": false,
        "Vault storage": false
    }
};

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
            const responseData: OrderDetails = action.payload.data?.data;
            if (responseData === null) {
                state.isOrderFound = false;
                state.loading = false;
                return;
            }
            responseData.orderItems.forEach((item: any) => {
                state.shippingMethods[item.shippingMethod as keyof typeof state.shippingMethods] = true;
            });
            state.orderConfirmationDetailsData = responseData;
            state.loading = false;
        })
        builder.addCase(getOrderConfirmationDetails.rejected, (state) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse } = orderConfirmationDetailsPageSlice.actions;

export default orderConfirmationDetailsPageSlice.reducer
