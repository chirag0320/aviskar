import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ConfigServices, { IloginUserBody } from '@/apis/services/ConfigServices'
import BlogServices from '@/apis/services/blogServices'

interface BlogState {
    blogList: {},
    loading: boolean
}
const initialState: BlogState = {
    blogList: {},
    loading: false
}

export const BlogList = appCreateAsyncThunk(
    'BlogList/status',
    async ({ body }: { body: any }) => {
        return await BlogServices.BlogList(body)
    }
)

export const blogpageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        resetWholeBlogPageData: (state) => {
            state.blogList = []
        },
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
    },

    extraReducers: (builder) => {
        // Get categories list
        builder.addCase(BlogList.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(BlogList.fulfilled, (state, action) => {
            state.blogList = action.payload.data.data
            state.loading = false
        })
        builder.addCase(BlogList.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { resetWholeBlogPageData, setLoadingTrue, setLoadingFalse } = blogpageSlice.actions

export default blogpageSlice.reducer
