import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CategoryServices from '@/apis/services/CategoryServices'
import { categoryData } from '@/types/categoryData'
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
  loading: false,
  items: null,
  count: 0,
  categories: [],
  price: null,
  specifications: {},
  manufactureres: [],
  productDetailsData: {},
  sortBy: null,
  sortedItems: [],
  clearFilters: false
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
      state.sortedItems = action.payload
      console.log("🚀 ~ state.items:", state.items)
    },
    setPriceForEachItem: (state, action: any) => {
      const priceForEachId = action.payload;

      state.items?.forEach((item: any) => {
        if (priceForEachId[item.productId]) {
          item.priceWithDetails = priceForEachId[item.productId]
        }
      })
      state.sortedItems?.forEach((item: any) => {
        if (priceForEachId[item.productId]) {
          item.priceWithDetails = priceForEachId[item.productId]
        }
      })
    },
    resetProductDetails: (state) => {
      state.productDetailsData = {}
      state.loading = false
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setClearFilters: (state, action) => {
      state.clearFilters = action.payload
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
        state.sortedItems = responseData.items;
        // localStorageSetItem('items', JSON.stringify(state.items))
        state.count = responseData.count;
        // localStorageSetItem('count', JSON.stringify(state.count))
        state.categories = filtersData.categories;
        // localStorageSetItem('categories', JSON.stringify(state.categories))
        state.manufactureres = filtersData.manufactureres;
        // localStorageSetItem('manufactureres', JSON.stringify(state.manufactureres))
        state.price = filtersData.price;
        // localStorageSetItem('price', JSON.stringify(state.price))
        state.specifications = filtersData.sepecifications; // Corrected the spelling of 'specifications' from the api
        // localStorageSetItem('specifications', JSON.stringify(state.specifications))
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
      state.loading = false;

    })
    builder.addCase(getProductDetailsData.rejected, (state) => {
      state.loading = false;
    })
  },
})

export const { setLoadingTrue, setLoadingFalse, setSortedItems, setPriceForEachItem, resetProductDetails, setSortBy, setClearFilters } = categoryPageSlice.actions;

export default categoryPageSlice.reducer
