import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
// import { MetalTypes, Metals, WeightTypes } from '@/types/enums'
import CalculatorsServices from '@/apis/services/calculatorsServices'
// Services

export interface Calculator {
    Metal: number,
    MetalType: number,
    MetalWeight: number,
    MetalWeightType: number
}

interface CalculatorsData {
    loading: boolean,
    calculatorType: number,
    calculators: Calculator[],
    shipping: number,
    insurance: number,
    vaultStorage: number
}

const initialState: CalculatorsData = {
    loading: false,
    calculatorType: 0,
    calculators: [],
    shipping: 0.00,
    insurance: 0.00,
    vaultStorage: 0.00
}

export const saveCalculatorsData = appCreateAsyncThunk(
    "saveCalculatorData",
    async ({ url, body }: {
        url: string, body: {
            CalculatorType: number,
            CalculatorData: Calculator[]
        }
    }) => {
        return await CalculatorsServices.saveCalculatorsData(url, body);
    }
)

export const calculatorsPagesSlice = createSlice({
    name: 'calculators',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        addCalculator(state, action) {
            const calculatorData = action.payload;
            state.calculators.push(calculatorData);
        },
        removeCalculator(state, action) {
            const calculatorIndex = action.payload;
            state.calculators.splice(calculatorIndex,1)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(saveCalculatorsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(saveCalculatorsData.fulfilled, (state, action) => {
            const responseData = action?.payload?.data?.data;

            state.shipping = responseData?.shipping
            state.insurance = responseData?.insurance
            state.vaultStorage = responseData?.vaultStorage
            state.loading = false;
        })
        builder.addCase(saveCalculatorsData.rejected, (state) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse,addCalculator, removeCalculator } = calculatorsPagesSlice.actions;

export default calculatorsPagesSlice.reducer
