import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CheckoutPageServices from '@/apis/services/checkoutCartServices'
import { any } from 'prop-types'
export type customerDetails = {
    "customerId": number,
    "email": string,
    "firstName": string,
    "lastName": string,
    "phoneNumber": string,
    "accounttype": string,
    "accountName": string,
    "masterCustomerId": any,
    "membershipid": number,
    "membershipName": any
}
export type shopingCartItem = {
    "id": number,
    "shoppingCartTypeId": number,
    "customerId": number,
    "productId": number,
    "storeCode": number,
    "quantity": number,
    "productName": string,
    "shortDescription": string,
    "friendlypagename": string,
    "imageUrl": string,
    "productPrice": number,
    "premiumDiscount": number,
    "productWeight": number,
    "parentProductId": number,
    "colorClass": string,
    "iconClass": string,
    "availability": string,
    "shippingInfo": string,
    "stock": number,
    "shippingMethod": any[],
    "shippableCountrys": any[]
}

interface CheckoutPageState {
    loading: boolean,
    checkoutPageData: {
        "customers": customerDetails[],
        "billingAddressDetails": [
            {
                "addressId": number,
                "addressType": number,
                "customerId": number,
                "firstName": string,
                "lastName": string,
                "addressLine1": string,
                "addressLine2": string,
                "city": string,
                "state": number,
                "postcode": number,
                "country": number,
                "phone1": string,
                "email": string,
                "isSource": string,
                "isVerified": boolean,
                "company": null,
                "isactive": boolean,
                "storeCode": number,
                "stateName": string,
                "countryName": string
            }
        ],
        "shippingAddressDetails": [
            {
                "addressId": number,
                "addressType": number,
                "customerId": number,
                "firstName": string,
                "lastName": string,
                "addressLine1": string,
                "addressLine2": string,
                "city": string,
                "state": number,
                "postcode": number,
                "country": number,
                "phone1": string,
                "email": string,
                "isSource": string,
                "isVerified": true,
                "company": any,
                "isactive": true,
                "storeCode": number,
                "stateName": string,
                "countryName": string
            },
        ],
        "shoppingCartItems": shopingCartItem[],
        "termsConditions": {
            "name": string,
            "value": string
        },
        "storeDetail": {
            "storeCode": number,
            "logoUrl": any,
            "companyName": string,
            "storeCodeName": string,
            "isKiosk": boolean,
            "isActive": boolean,
            "currency": string,
            "isBankTransfer": boolean,
            "isCash": boolean,
            "isCreditCard": boolean,
            "isLocalPickup": boolean,
            "isSecureShipping": boolean,
            "isVaultStorage": boolean,
            "shippingTax": number,
            "vaultstorageTax": number,
            "creadatcardTax": number
        },
        "rewardPointAvaibility": {
            "isApplicableToUseRewardPoints": boolean,
            "availableRewardPoints": number,
            "rewardPointAmount": number
        },
        "customerId": number
    } | null,
    subTotal: number,
    finalDataForTheCheckout: any,
    insuranceAndTaxCalculation: any
}
const initialState: CheckoutPageState = {
    loading: false,
    checkoutPageData: null,
    subTotal: 0,
    finalDataForTheCheckout: null,
    insuranceAndTaxCalculation:null
}

export const getCheckoutPageData = appCreateAsyncThunk(
    'getCheckoutPageData',
    async ({ url }: { url: string }) => {
        return await CheckoutPageServices.getCheckoutPageData(url)
    }
)

export const getInsuranceAndTaxDetailsCalculation = appCreateAsyncThunk(
    'getInsuranceAndTaxDetailsCalculation',
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.getInsuranceAndTaxInfo(url, body)
    }
)
export const addOrEditAddress = appCreateAsyncThunk(
    "addOrEditAddress",
    async ({ url, body }: { url: string, body: any }) => {

    }
)

export const checkoutPage = createSlice({
    name: 'checkoutPage',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        resetSubTotalCheckoutPage: (state) => {
            state.subTotal = 0
        },
        updateSubTotalCheckoutPage: (state, action) => {
            state.subTotal += action.payload;
            state.subTotal = Math.round((state.subTotal + Number.EPSILON) * 100) / 100
        },
        updateFinalDataForTheCheckout: (state, action) => {
            state.finalDataForTheCheckout = { ...state.finalDataForTheCheckout, ...action.payload }
        }
    },

    extraReducers: (builder) => {
        // get checkout page data
        builder.addCase(getCheckoutPageData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCheckoutPageData.fulfilled, (state, action) => {
            state.checkoutPageData = action?.payload?.data?.data
            state.loading = false;
        })
        builder.addCase(getCheckoutPageData.rejected, (state, action) => {
            state.loading = false
        })
        // get checkout page data
        builder.addCase(getInsuranceAndTaxDetailsCalculation.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getInsuranceAndTaxDetailsCalculation.fulfilled, (state, action) => {
            state.insuranceAndTaxCalculation = action?.payload?.data?.data
            state.loading = false;
        })
        builder.addCase(getInsuranceAndTaxDetailsCalculation.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, updateSubTotalCheckoutPage, resetSubTotalCheckoutPage, updateFinalDataForTheCheckout } = checkoutPage.actions

export default checkoutPage.reducer
