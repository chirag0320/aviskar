import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import { CartItem } from '@/types/shoppingCart'
import ShoppingCartServices from '@/apis/services/shoppingCartServices'

interface ShoppingCartState {
    loading: boolean,
    cartItems: CartItem[],
    subTotal: number
}
const initialState: ShoppingCartState = {
    loading: false,
    cartItems: [],
    subTotal: 0
}

export const getShoppingCartData = appCreateAsyncThunk(
    'getShoppingCart',
    async ({ url, body }: { url: string, body: any }) => {
        return await ShoppingCartServices.getShoppingCartData(url, body)
    }
)

export const updateShoppingCartData = appCreateAsyncThunk(
    'updateShoppingCart',
    async ({ url, body }: { url: string, body: any }) => {
        return await ShoppingCartServices.updateShoppingCartData(url, body)
    }
)

export const clearShoppingCartData = appCreateAsyncThunk(
    'clearShoppingCart',
    async ({ url, body }: { url: string, body: any }) => {
        return await ShoppingCartServices.clearShoppingCartData(url, body);
    }
)

export const shoppingCart = createSlice({
    name: 'shoppingCart',
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
        // get shopping cart data
        builder.addCase(getShoppingCartData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getShoppingCartData.fulfilled, (state, action) => {
            state.cartItems = action.payload.data.data.items;
            state.loading = false;
        })
        builder.addCase(getShoppingCartData.rejected, (state, action) => {
            state.loading = false
        })

        // update shopping cart data
        builder.addCase(updateShoppingCartData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateShoppingCartData.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateShoppingCartData.rejected, (state, action) => {
            state.loading = false
        })

        // delete shopping cart data
        builder.addCase(clearShoppingCartData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(clearShoppingCartData.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(clearShoppingCartData.rejected, (state, action) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, updateSubTotal, resetSubTotal } = shoppingCart.actions

export default shoppingCart.reducer
