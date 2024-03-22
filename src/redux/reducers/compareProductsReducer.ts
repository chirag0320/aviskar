import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CompareProductsServices from '@/apis/services/compareProductsServices'
import { CompareProduct } from '@/types/compareProducts'

interface ShoppingCartState {
    loading: boolean,
    productIds: number[],
    specificationKeys: string[],
    comparedProducts: CompareProduct[]
}

const initialState: ShoppingCartState = {
    loading: false,
    productIds: JSON.parse(localStorage.getItem('productIds') ?? '[]'),
    specificationKeys: JSON.parse(localStorage.getItem('specificationKeys') ?? '[]'),
    comparedProducts: JSON.parse(localStorage.getItem('comparedProducts') ?? '[]')
}

export const getCompareProducts = appCreateAsyncThunk(
    'getCompareProducts',
    async ({ url, body }: { url: string, body: any }) => {
        return await CompareProductsServices.getCompareProducts(url, body);
    }
)

export const compareProducts = createSlice({
    name: 'compareProducts',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        addProductToCompare: (state, action) => {
            const productId = action.payload;
            console.log("🚀 ~ action.payload:", action.payload)

            if (!state.productIds.includes(productId) && state.productIds.length < 5) {
                state.productIds = [...state.productIds, productId]
            }
        },
        removeProductFromCompare: (state, action) => {
            console.log("🚀 ~ action.payload:", action)
            state.productIds = state.productIds.filter((id) => id !== action.payload)
        },
        clearCompareList: (state) => {
            state.productIds = []
            state.comparedProducts = []
            state.specificationKeys = []
        }
    },
    extraReducers: (builder) => {
        // get compare products
        builder.addCase(getCompareProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCompareProducts.fulfilled, (state, action) => {
            const responseData = action.payload.data.data;

            state.specificationKeys = responseData.specificationKeys;
            state.comparedProducts = responseData.comparedProducts;
            state.loading = false
        })
        builder.addCase(getCompareProducts.rejected, (state) => {
            state.loading = false
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, addProductToCompare, removeProductFromCompare, clearCompareList } = compareProducts.actions

export default compareProducts.reducer
