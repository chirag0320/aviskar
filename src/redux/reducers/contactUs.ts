import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ContactUsServices from '@/apis/services/ContactUsServices'
import { ConfigDetails, ContactUsFormDetails, Reason } from '@/types/contactUs'
import { isBrowser, localStorageGetItem, localStorageSetItem } from '@/utils/common'
// Services

interface ContactUsData {
    loading: boolean,
    reasonsForContact: Reason[],
    html: {
        [key: string]: ConfigDetails
    }
}

const initialState: ContactUsData = {
    loading: false,
    reasonsForContact: isBrowser && JSON.parse(localStorageGetItem('reasonsForContact') ?? JSON.stringify([])),
    html: isBrowser && JSON.parse(localStorageGetItem('html') ?? JSON.stringify({}))
}

export const saveContactUsDetails = appCreateAsyncThunk(
    "saveContactUsData",
    async ({ url, body }: { url: string, body: ContactUsFormDetails }) => {
        return await ContactUsServices.saveContactUsData(url, body);
    }
)

export const getReasonsForContactUs = appCreateAsyncThunk(
    "getResonsForContact",
    async ({ url }: { url: string }) => {
        return await ContactUsServices.getReasonsForContact(url);
    }
)

export const getConfiguration = appCreateAsyncThunk(
    "configuration",
    async ({ url }: { url: string }) => {
        return await ContactUsServices.getConfiguration(url);
    }
)

export const contactUsPageSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        // reasons for contact
        builder.addCase(getReasonsForContactUs.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getReasonsForContactUs.fulfilled, (state, action) => {
            const responseData = action.payload.data;
            state.reasonsForContact = responseData.data;
            state.loading = false;
            localStorageSetItem('reasonsForContact',JSON.stringify(responseData.data))
            state.loading = false;
        })
        builder.addCase(getReasonsForContactUs.rejected, (state) => {
            state.loading = false;
        })

        // configuration htmls
        builder.addCase(getConfiguration.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getConfiguration.fulfilled, (state, action) => {
            const responseData = action.payload.data.data;

            const config: {
                [key: string]: ConfigDetails
            } = {};

            responseData.forEach((ele: any) => {
                config[ele.name] = {
                    id: ele.id,
                    name: ele.name,
                    value: ele.value,
                    storedId: ele.storedId
                }
            });

            state.html = config;
            localStorageSetItem('html', JSON.stringify(config))
            state.loading = false;
        })
        builder.addCase(getConfiguration.rejected, (state) => {
            state.loading = false;
        })

        // save contact data
        builder.addCase(saveContactUsDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(saveContactUsDetails.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(saveContactUsDetails.rejected, (state) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse } = contactUsPageSlice.actions;

export default contactUsPageSlice.reducer
