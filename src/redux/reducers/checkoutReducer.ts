import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CheckoutPageServices from '@/apis/services/checkoutCartServices'

interface CheckoutPageState {
    loading: boolean,
    checkoutPageData: {},
    subTotal: number
}
const initialState: CheckoutPageState = {
    loading: false,
    checkoutPageData: {},
    subTotal: 0
}

export const getCheckoutPageData = appCreateAsyncThunk(
    'getCheckoutPageData',
    async ({ url }: { url: string }) => {
        return await CheckoutPageServices.getCheckoutPageData(url)
    }
)

export const checkoutPage = createSlice({
    name: 'checkoutPage',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        resetSubTotal: (state) => {
            state.subTotal = 0
        },
        updateSubTotal: (state, action) => {
            state.subTotal += action.payload;
            state.subTotal = Math.round((state.subTotal + Number.EPSILON) * 100) / 100
        }
    },

    extraReducers: (builder) => {
        // get checkout page data
        builder.addCase(getCheckoutPageData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCheckoutPageData.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(getCheckoutPageData.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, updateSubTotal, resetSubTotal } = checkoutPage.actions

export default checkoutPage.reducer
