import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import { CartItem } from '@/types/shoppingCart'
import TopicServices from '@/apis/services/TopicServices'
interface topicDetails {
    id: number;
    systemName: string;
    includeInSitemap: boolean;
    includeInTopMenu: boolean;
    includeInFooterColumn1: boolean;
    includeInFooterColumn2: boolean;
    includeInFooterColumn3: boolean;
    displayOrder: number;
    accessibleWhenStoreClosed: boolean;
    title: string;
    body: string;
    published: boolean;
    metaKeywords: string | null;
    metaDescription: string;
    metaTitle: string;
    friendlyName: string;
    isActive: boolean;
    isHeader: boolean;
    isFooter: boolean;
    categoryEnum: number;
  }
  
interface TopicState {
    loading: boolean,
    topicDetails : topicDetails | null
}
const initialState: TopicState = {
    loading: false,
    topicDetails : null
}

export const getTopicDetails = appCreateAsyncThunk(
    'getTopicDetails',
    async ({ url }: { url: string }) => {
        return await TopicServices.getTopicDetails(url)
    }
)

export const topicPageSlice = createSlice({
    name: 'wishList',
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
        // get wish list data
        builder.addCase(getTopicDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTopicDetails.fulfilled, (state, action) => {
            state.topicDetails = action.payload.data.data
            state.loading = false
        })
        builder.addCase(getTopicDetails.rejected, (state) => {
            state.loading = false
        })
    },
})

export const { setLoadingTrue, setLoadingFalse } = topicPageSlice.actions

export default topicPageSlice.reducer
