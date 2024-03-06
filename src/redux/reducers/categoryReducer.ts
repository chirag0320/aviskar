import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ConfigServices, { IloginUserBody } from '@/apis/services/ConfigServices'
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
  manufactureres: []
}

export const getCategoryData = appCreateAsyncThunk(
  "getCategoryData",
  async ({ url, body }: { url: string, body: filterQuery }) => {
    return await CategoryServices.getCategoryData(url, body);
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
  },

  extraReducers: (builder) => {
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
  },
})

export const { setLoadingTrue, setLoadingFalse } = categoryPageSlice.actions;

export default categoryPageSlice.reducer
