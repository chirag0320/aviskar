import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CompareProductsServices from '@/apis/services/compareProductsServices'
import { CompareProduct } from '@/types/compareProducts'
import { isBrowser, localStorageGetItem, localStorageSetItem } from '@/utils/common'

interface ShoppingCartState {
    loading: boolean,
    productIds: number[],
    specificationKeys: string[],
    comparedProducts: CompareProduct[]
}

const initialState: ShoppingCartState = {
    loading: false,
    productIds: isBrowser && JSON.parse(localStorageGetItem('productIds') ?? JSON.stringify([])),
    specificationKeys: isBrowser && JSON.parse(localStorageGetItem('specificationKeys') ?? JSON.stringify([])),
    comparedProducts: isBrowser && JSON.parse(localStorageGetItem('comparedProducts') ?? JSON.stringify([]))
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

            if (!state.productIds.includes(productId) && state.productIds.length < 5) {
                state.productIds = [...state.productIds, productId]
                localStorageSetItem('productIds', JSON.stringify(state.productIds))
            }
        },
        removeProductFromCompare: (state, action) => {
            const filteredIds = state.productIds.filter((id) => id !== action.payload)
            state.productIds = filteredIds
            localStorageSetItem('productIds', JSON.stringify(filteredIds))
        },
        clearCompareList: (state) => {
            state.productIds = []
            state.comparedProducts = []
            state.specificationKeys = []
            localStorageSetItem('productIds', JSON.stringify(state.productIds))
            localStorageSetItem('comparedProducts', JSON.stringify(state.comparedProducts))
            localStorageSetItem('specificationKeys', JSON.stringify(state.specificationKeys))
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
            // NOte : adding manually because not present in response
            state.specificationKeys.unshift("Picture");
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
