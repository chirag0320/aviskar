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
  items: [],
  count: 0,
  categories: [],
  price: {
    minPrice: 0,
    maxPrice: 0
  },
  specifications: {
  },
  manufactureres: [],
  productDetailsData:{}
}

export const getCategoryData = appCreateAsyncThunk(
  "getCategoryData",
  async ({ url, body }: { url: string, body: filterQuery }) => {
    return await CategoryServices.getCategoryData(url, body);
  }
)
export const getProductDetailsData = appCreateAsyncThunk(
  "getProductDetailsData",
  async ({ url }: { url: string}) => {
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
    },
    setPriceForEachItem: (state, action: any) => {
      const priceForEachId = action.payload;

      state.items.forEach((item: any) => {
        if (priceForEachId[item.productId]) {
          item.priceWithDetails = priceForEachId[item.productId]
        }
      })
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
        state.count = responseData.count;

        state.categories = filtersData.categories;
        state.manufactureres = filtersData.manufactureres;
        state.price = filtersData.price;
        state.specifications = filtersData.sepecifications; // Corrected the spelling of 'specifications'
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

export const { setLoadingTrue, setLoadingFalse, setSortedItems, setPriceForEachItem } = categoryPageSlice.actions;

export default categoryPageSlice.reducer
