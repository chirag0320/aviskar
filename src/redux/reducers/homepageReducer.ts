import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ConfigServices, { IloginUserBody } from '@/apis/services/ConfigServices'
import { isBrowser, localStorageGetItem, localStorageSetItem } from '@/utils/common'

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
  recentlyViewedProducts: any[],
  // toaster
  openToaster: boolean,
  buttonText: string,
  redirectButtonUrl: string,
  toasterMessage: string,
  scrollPosition: number,
  severity: 'error' | 'success' | 'info' | 'warning'
}
const initialState: CreateGuidelineState = {
  configDetails: isBrowser && JSON.parse(localStorageGetItem('configDetails') ?? JSON.stringify({})),
  loading: false,
  sectionDetails: isBrowser && JSON.parse(localStorageGetItem('sectionDetails') ?? JSON.stringify({ 1: {}, 2: {} })),
  categoriesList: isBrowser && JSON.parse(localStorageGetItem('categoriesList') ?? JSON.stringify(({}))),
  userDetails: isBrowser && JSON.parse(localStorageGetItem('userDetails') || JSON.stringify({})),
  isLoggedIn: isBrowser && JSON.parse(localStorageGetItem('isLoggedIn') || JSON.stringify(false)),
  loadingForSignIn: false,
  mebershipPlanDetailsData: isBrowser && JSON.parse(localStorageGetItem('mebershipPlanDetailsData') ?? JSON.stringify({})),
  recentlyViewedProducts: isBrowser && JSON.parse(localStorageGetItem('recentlyViewedProducts') ?? JSON.stringify([])),
  openToaster: false,
  buttonText: '',
  redirectButtonUrl: '',
  toasterMessage: '',
  scrollPosition: 0,
  severity: 'info'
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
      localStorageSetItem('configDetails', JSON.stringify(state.configDetails))
      localStorageSetItem('mebershipPlanDetailsData', JSON.stringify(state.mebershipPlanDetailsData))
    },
    setLoadingTrue: (state) => {
      state.loading = true
    },
    setLoadingFalse: (state) => {
      state.loading = false
    },
    setRecentlyViewedProduct: (state, action) => {
      const newProductId = action.payload;
      // Check if the product already exists in the recently viewed list
      const existingIndex = state.recentlyViewedProducts.findIndex(productId => productId === newProductId);
      if (existingIndex === -1) {
        let updatedViewProducts = [newProductId, ...state.recentlyViewedProducts]
        if (updatedViewProducts?.length > 20) {
          updatedViewProducts.splice(0, 20)
        }
        state.recentlyViewedProducts = updatedViewProducts
        localStorageSetItem('recentlyViewedProducts', JSON.stringify(updatedViewProducts))
      } else {
        let updatedViewProducts = [...state.recentlyViewedProducts]
        updatedViewProducts.splice(existingIndex, 1);
        updatedViewProducts.unshift(newProductId);
        state.recentlyViewedProducts = updatedViewProducts
        localStorageSetItem('recentlyViewedProducts', JSON.stringify(updatedViewProducts))
      }
    },
    setToasterState: (state, action) => {
      state.openToaster = action.payload.openToaster
      state.toasterMessage = action.payload.toasterMessage
      state.buttonText = action.payload.buttonText || ''
      state.redirectButtonUrl = action.payload.redirectButtonUrl || ''
      state.severity = action.payload.severity || 'info'
    },
    // setToasterMeaasge: (state, action) => {
    //   state.toasterMessage = action.payload
    // },
    // setButtonText: (state, action) => {
    //   state.buttonText = action.payload
    // },
    // setRedirectUrl: (state, action) => {
    //   state.redirectButtonUrl = action.payload
    // },
    setScrollPosition : (state,action) => {
      state.scrollPosition = action.payload;
    }
  },

  extraReducers: (builder) => {
    // Get Homepage configs
    builder.addCase(configDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(configDetails.fulfilled, (state, action) => {
      const data = action?.payload?.data?.data?.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr
        return acc
      }, {})
      state.configDetails = data
      state.loading = false
      localStorageSetItem('configDetails', JSON.stringify(data))
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
      localStorageSetItem('mebershipPlanDetailsData', JSON.stringify(action?.payload?.data?.data))
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
      const data = action?.payload?.data?.data?.reduce((acc: any, current: any) => {
        acc[current.sectionEnum] = current
        return acc
      }, { 1: {}, 2: {} }) ?? {}
      state.sectionDetails = data
      state.loading = false
      localStorageSetItem('sectionDetails', JSON.stringify(data))
    })
    builder.addCase(HomePageSectionDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get categories list
    builder.addCase(CategoriesListDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(CategoriesListDetails.fulfilled, (state, action) => {
      const data = { ...action?.payload?.data?.data, items: action?.payload?.data?.data?.items?.sort((a: any, b: any) => a?.categoryId - b?.categoryId) }
      state.categoriesList = data
      localStorageSetItem('categoriesList', JSON.stringify(data))
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
      localStorageSetItem('userDetails', JSON.stringify(action.payload.data.data))
      state.loadingForSignIn = false
      state.isLoggedIn = true
      localStorageSetItem('isLoggedIn', JSON.stringify(true))
    })
    builder.addCase(LoginUserAPI.rejected, (state, action) => {
      state.loadingForSignIn = false
    })
    // LogOutUserAPI
    builder.addCase(LogOutUserAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(LogOutUserAPI.fulfilled, (state, action) => {
      state.userDetails = null
      localStorageSetItem('userDetails', '')
      state.loading = false
      state.isLoggedIn = false
      localStorageSetItem('isLoggedIn', JSON.stringify(false))
    })
    builder.addCase(LogOutUserAPI.rejected, (state, action) => {
      state.loading = false
    })
    // ImpersonateSignInAPI
    builder.addCase(ImpersonateSignInAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(ImpersonateSignInAPI.fulfilled, (state, action) => {
      state.userDetails = action.payload.data.data
      localStorageSetItem('userDetails', JSON.stringify(action.payload.data.data))
      state.loading = false
      state.isLoggedIn = true
      localStorageSetItem('isLoggedIn', JSON.stringify(true))
    })
    builder.addCase(ImpersonateSignInAPI.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { resetWholeHomePageData, setLoadingTrue, setLoadingFalse, setRecentlyViewedProduct, setToasterState , setScrollPosition} = createHomepageSlice.actions

export default createHomepageSlice.reducer
