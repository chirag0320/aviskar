import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import { CartItem } from '@/types/shoppingCart'
import WishListServices from '@/apis/services/WishListServices'

interface WishListState {
    loading: boolean,
    wishListItems: CartItem[] | null
}
const initialState: WishListState = {
    loading: false,
    wishListItems: null
}

export const getWishListData = appCreateAsyncThunk(
    'getWishListData',
    async ({ url, body }: { url: string, body: any }) => {
        return await WishListServices.getWishListData(url, body)
    }
)

export const updateWishListData = appCreateAsyncThunk(
    'updateWishListData',
    async ({ url, body }: { url: string, body: any }) => {
        return await WishListServices.updateWishListData(url, body)
    }
)

export const deleteWishListData = appCreateAsyncThunk(
    'deleteWishListData',
    async ({ url, body }: { url: string, body: any }) => {
        return await WishListServices.deleteWishListData(url, body);
    }
)

export const addToWishList = appCreateAsyncThunk(
    "addToWishList",
    async ({ url, body }: { url: string, body: any }) => {
        return await WishListServices.addToWishList(url, body)
    }
)

export const addToWishListToShoppingCart = appCreateAsyncThunk(
    "addToWishListToShoppingCart",
    async ({ url, body }: { url: string, body: any }) => {
        return await WishListServices.addToWishListToShoppingCart(url, body);
    }
)

export const wishListPageSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        removeItemFromWishlist: (state, action) => {
            if (state.wishListItems) {
                state.wishListItems = state.wishListItems.filter((item: any) => !action.payload.includes(item.id))
            }
        }
    },

    extraReducers: (builder) => {
        // get wish list data
        builder.addCase(getWishListData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getWishListData.fulfilled, (state, action) => {
            state.wishListItems = action.payload.data.data.items
            state.loading = false
        })
        builder.addCase(getWishListData.rejected, (state) => {
            state.loading = false
        })

        // add to wishlist
        builder.addCase(addToWishList.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addToWishList.fulfilled, (state, action) => {
            // console.log(action.payload.data);

            // // state.wishListItems = action.payload.data.data.items
            state.loading = false
        })
        builder.addCase(addToWishList.rejected, (state) => {
            state.loading = false
        })

        // update wish listdata
        builder.addCase(updateWishListData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateWishListData.fulfilled, (state, action) => {
            // console.log(action.payload.data);

            // // state.wishListItems = action.payload.data.data.items
            state.loading = false
        })
        builder.addCase(updateWishListData.rejected, (state) => {
            state.loading = false
        })

        // delete wish list data
        builder.addCase(deleteWishListData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteWishListData.fulfilled, (state, action) => {
            // console.log(action.payload.data);

            // // state.wishListItems = action.payload.data.data.items
            state.loading = false
        })
        builder.addCase(deleteWishListData.rejected, (state) => {
            state.loading = false
        })

        // addWishlist to shopping cart
        builder.addCase(addToWishListToShoppingCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addToWishListToShoppingCart.fulfilled, (state, action) => {
            // console.log(action.payload.data);

            // // state.wishListItems = action.payload.data.data.items
            state.loading = false
        })
        builder.addCase(addToWishListToShoppingCart.rejected, (state) => {
            state.loading = false
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, removeItemFromWishlist } = wishListPageSlice.actions

export default wishListPageSlice.reducer
