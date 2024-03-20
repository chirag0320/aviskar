import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ConfigServices, { IloginUserBody } from '@/apis/services/ConfigServices'

// Services

interface CreateGuidelineState {
  configDetails: any,
  sectionDetails: any,
  loading: boolean,
  categoriesList: any,
  userDetails: {
    customerId: number,
    email: string,
    token: string,
    firstName: string,
    lastName: string,
    legalName: string,
    contactNo: string,
    customerGuid: string,
    qrCodeUrl: any,
    ordersCount: number
  } | null,
  isLoggedIn: boolean,
  loadingForSignIn: boolean,
  mebershipPlanDetailsData: any,
  recentlyViewedProducts: any[]
}
const initialState: CreateGuidelineState = {
  configDetails: {},
  loading: false,
  sectionDetails: {
    1: {},
    2: {}
  },
  categoriesList: {},
  userDetails: null,
  isLoggedIn: false,
  loadingForSignIn: false,
  mebershipPlanDetailsData: {},
  recentlyViewedProducts:[]
}

export const configDetails = appCreateAsyncThunk(
  'configDetails/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.details(url)
  }
)
export const HomePageSectionDetails = appCreateAsyncThunk(
  'HomePageSectionDetails/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.homePageSectiondetails(url)
  }
)
export const CategoriesListDetails = appCreateAsyncThunk(
  'CategoriesListDetails/status',
  async ({ url, body }: { url: string, body: any }) => {
    return await ConfigServices.categoriesList(url, body)
  }
)

export const LoginUserAPI = appCreateAsyncThunk(
  'LoginUserAPI/status',
  async ({ url, body }: { url: string, body: IloginUserBody }) => {
    return await ConfigServices.loginUser(url, body)
  }
)
export const LogOutUserAPI = appCreateAsyncThunk(
  'LogOutUserAPI/status',
  async () => {
    return await ConfigServices.logOutUser()
  }
)
export const ImpersonateSignInAPI = appCreateAsyncThunk(
  'ImpersonateSignInAPI/status',
  async ({ token }: { token: any }) => {
    return await ConfigServices.ImpersonateSignIn(token)
  }
)
export const membershipPlanDetails = appCreateAsyncThunk(
  'membershipPlanDetails/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.membershipPlanDetails(url)
  }
)
// export const add = appCreateAsyncThunk(
//   'add/status',
//   async (data: GuidelineTitleParams) => {
//     return await GuidelineService.add(data)
//   }
// )

// export const update = appCreateAsyncThunk(
//   'update/status',
//   async (data: GuidelinelInputs[]) => {
//     return await GuidelineService.update(data)
//   }
// )

// export const deleteGuideline = appCreateAsyncThunk(
//   'deleteGuideline/status',
//   async (data: GuidelineIdParams) => {
//     return await GuidelineService.deleteGuideline(data)
//   }
// )

export const createHomepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    resetWholeHomePageData: (state) => {
      state.configDetails = {}
      state.mebershipPlanDetailsData = {}
    },
    setLoadingTrue: (state) => {
      state.loading = true
    },
    setLoadingFalse: (state) => {
      state.loading = false
    },
    setRecentlyViewedProduct: (state, action) => {
      const newProductId = action.payload;
      console.log("🚀 ~ newProductId:", newProductId)
      // Check if the product already exists in the recently viewed list
      const existingIndex = state.recentlyViewedProducts.findIndex(productId => productId === newProductId);
      console.log("🚀 ~ existingIndex:", existingIndex)
      if (existingIndex === -1) {
        // Product does not exist, add it to the list
        state.recentlyViewedProducts.unshift(newProductId);
        state.recentlyViewedProducts = state?.recentlyViewedProducts?.length > 20 ? state.recentlyViewedProducts.splice(0,20) : state.recentlyViewedProducts
      } else {
        // Product already exists, remove it from its current position and add it to the beginning of the list
        state.recentlyViewedProducts.splice(existingIndex, 1);
        state.recentlyViewedProducts.unshift(newProductId);
      }
    }
    
  },

  extraReducers: (builder) => {
    // Get Homepage configs
    builder.addCase(configDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(configDetails.fulfilled, (state, action) => {
      state.configDetails = action?.payload?.data?.data?.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr
        return acc
      }, {})
      state.loading = false
    })
    builder.addCase(configDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get membership plan data
    builder.addCase(membershipPlanDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(membershipPlanDetails.fulfilled, (state, action) => {
      state.mebershipPlanDetailsData = action?.payload?.data?.data
      console.log("🚀 ~ builder.addCase ~ action?.payload?.data?.data:", action?.payload?.data?.data)
      state.loading = false
    })
    builder.addCase(membershipPlanDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get Homepagesection details
    builder.addCase(HomePageSectionDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(HomePageSectionDetails.fulfilled, (state, action) => {
      state.sectionDetails = action?.payload?.data?.data?.reduce((acc: any, current: any) => {
        acc[current.sectionEnum] = current
        return acc
      }, { 1: {}, 2: {} }) ?? {}
      state.loading = false
    })
    builder.addCase(HomePageSectionDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get categories list
    builder.addCase(CategoriesListDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(CategoriesListDetails.fulfilled, (state, action) => {
      state.categoriesList = { ...action?.payload?.data?.data, items: action?.payload?.data?.data?.items?.sort((a: any, b: any) => a?.categoryId - b?.categoryId) }
      state.loading = false
    })
    builder.addCase(CategoriesListDetails.rejected, (state, action) => {
      state.loading = false
    })
    // login User API
    builder.addCase(LoginUserAPI.pending, (state, action) => {
      state.loadingForSignIn = true
    })
    builder.addCase(LoginUserAPI.fulfilled, (state, action) => {
      state.userDetails = action.payload.data.data
      state.loadingForSignIn = false
      state.isLoggedIn = true
    })
    builder.addCase(LoginUserAPI.rejected, (state, action) => {
      state.loadingForSignIn = false
    })
    // LogOutUserAPI
    builder.addCase(LogOutUserAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(LogOutUserAPI.fulfilled, (state, action) => {
      // console.log("🚀ff ~ builder.addCase ~ action.payload.data:", action.payload)
      state.userDetails = null
      state.loading = false
      state.isLoggedIn = false
    })
    builder.addCase(LogOutUserAPI.rejected, (state, action) => {
      // console.log("🚀rr ~ builder.addCase ~ action.payload.data:", action.payload)
      state.loading = false
    })
    // ImpersonateSignInAPI
    builder.addCase(ImpersonateSignInAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(ImpersonateSignInAPI.fulfilled, (state, action) => {
      state.userDetails = action.payload.data.data
      state.loading = false
      state.isLoggedIn = true
    })
    builder.addCase(ImpersonateSignInAPI.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { resetWholeHomePageData, setLoadingTrue, setLoadingFalse, setRecentlyViewedProduct } = createHomepageSlice.actions

export default createHomepageSlice.reducer
