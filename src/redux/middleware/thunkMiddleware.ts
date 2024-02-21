/* eslint-disable @typescript-eslint/no-invalid-void-type */
import toast from 'react-hot-toast'
import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit'
import type { AsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit'

// Utils
import { RequestException } from '@/utils/requestException'
// import { errorMessage } from '../../utils/messages'
// import { clearProfile } from '../../redux/reducers/profileReducer'
interface ThunkAPIConfig {}
interface AppCreateAsyncThunkOption {
  disableToastError?: boolean
}
export const appCreateAsyncThunk = <Returned, ThunkArg = void>(
  type: string,
  thunk: AsyncThunkPayloadCreator<Promise<Returned>, ThunkArg>,
  options?: AppCreateAsyncThunkOption
): AsyncThunk<Returned, ThunkArg, ThunkAPIConfig> => {
  return createAsyncThunk<Returned, ThunkArg, ThunkAPIConfig>(
    type,
    async (arg, thunkAPI) => {
      try {
        return await thunk(arg, thunkAPI)
      } catch (error:any) {
        // if (error instanceof RequestException) {
        //   if (error.statusCode === 401 || error.statusCode === 403) {
        //     // thunkAPI.dispatch(clearProfile())
        //   }
        //   if (!options?.disableToastError) {
        //     if (
        //       Array.isArray(error.body) &&
        //       Object.prototype.hasOwnProperty.call(error.body[0], 'message')
        //     ) {
        //       toast.error(error.body[0].message)
        //     } else if (typeof error.body?.detail === 'string') {
        //       toast.error(error.body.detail)
        //     } else {
        //       // toast.error(errorMessage.commonError)
        //     }
        //   }
        //   return thunkAPI.rejectWithValue(miniSerializeError(error))
        // }
        // if (!options?.disableToastError) {
        // //   toast.error(errorMessage.commonError)
        // }
        return thunkAPI.rejectWithValue(error)
      }
    }
  )
}
