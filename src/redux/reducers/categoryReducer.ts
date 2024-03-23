import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CategoryServices from '@/apis/services/CategoryServices'
import { categoryData } from '@/types/categoryData'
import { isBrowser, localStorageGetItem, localStorageSetItem } from '@/utils/common'
// Services

interface filterQuery {
  search: string,
  pageNo: number,
  pageSize: number,
  sortBy: string,
  sortOrder: string,
  filters: any
}

const initialState: categoryData = {
  loading: isBrowser && JSON.parse(localStorageGetItem("loading") ?? JSON.stringify(false)),
  items: isBrowser && JSON.parse(localStorageGetItem("items") ?? JSON.stringify([])),
  count: isBrowser && JSON.parse(localStorageGetItem("count") ?? JSON.stringify(0)),
  categories: isBrowser && JSON.parse(localStorageGetItem("categories") ?? JSON.stringify([])),
  price: isBrowser && JSON.parse(localStorageGetItem("price") ?? JSON.stringify({minPrice: 0,maxPrice: 0})),
  specifications: isBrowser && JSON.parse(localStorageGetItem("specifications") ?? JSON.stringify({})),
  manufactureres: isBrowser && JSON.parse(localStorageGetItem("manufactureres") ?? JSON.stringify([])),
  productDetailsData: isBrowser && JSON.parse(localStorageGetItem("productDetailsData") ?? JSON.stringify({}))
}

export const getCategoryData = appCreateAsyncThunk(
  "getCategoryData",
  async ({ url, body }: { url: string, body: filterQuery }) => {
    return await CategoryServices.getCategoryData(url, body);
  }
)
export const getProductDetailsData = appCreateAsyncThunk(
  "getProductDetailsData",
  async ({ url }: { url: string }) => {
    return await CategoryServices.getProductDetailsData(url);
  }
)

export const categoryPageSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setLoadingTrue: (state) => {
      state.loading = true
    },
    setLoadingFalse: (state) => {
      state.loading = false
    },
    setSortedItems: (state, action) => {
      state.items = action.payload
      localStorageSetItem('items', JSON.stringify(state.items))
    },
    setPriceForEachItem: (state, action: any) => {
      const priceForEachId = action.payload;

      state.items.forEach((item: any) => {
        if (priceForEachId[item.productId]) {
          item.priceWithDetails = priceForEachId[item.productId]
        }
      })
      localStorageSetItem('items', JSON.stringify(state.items))
    }
  },

  extraReducers: (builder) => {
    // category Data
    builder.addCase(getCategoryData.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      const responseData = action.payload.data.data;
      const additionalField = responseData.additionalField;

      if (additionalField && additionalField.filters) {
        const filtersData = additionalField.filters;

        state.items = responseData.items;
        localStorageSetItem('items', JSON.stringify(state.items))
        state.count = responseData.count;
        localStorageSetItem('count', JSON.stringify(state.count))
        state.categories = filtersData.categories;
        localStorageSetItem('categories', JSON.stringify(state.categories))
        state.manufactureres = filtersData.manufactureres;
        localStorageSetItem('manufactureres', JSON.stringify(state.manufactureres))
        state.price = filtersData.price;
        localStorageSetItem('price', JSON.stringify(state.price))
        state.specifications = filtersData.sepecifications; // Corrected the spelling of 'specifications'
        localStorageSetItem('specifications', JSON.stringify(state.specifications))
      }

      state.loading = false;

    })
    builder.addCase(getCategoryData.rejected, (state) => {
      state.loading = false;
    })

    // product Details Data
    builder.addCase(getProductDetailsData.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getProductDetailsData.fulfilled, (state, action) => {
      state.productDetailsData = action.payload.data.data
      localStorageSetItem('productDetailsData', JSON.stringify(state.productDetailsData))
      state.loading = false;

    })
    builder.addCase(getProductDetailsData.rejected, (state) => {
      state.loading = false;
    })

  },
})

export const { setLoadingTrue, setLoadingFalse, setSortedItems, setPriceForEachItem } = categoryPageSlice.actions;

export default categoryPageSlice.reducer
