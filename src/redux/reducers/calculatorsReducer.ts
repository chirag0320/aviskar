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
    vaultStorage: number,
    openai: []
}

const initialState: CalculatorsData = {
    loading: false,
    calculatorType: 0,
    calculators: [],
    shipping: 0.00,
    insurance: 0.00,
    vaultStorage: 0.00,
    openai: []
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

export const getAIdata = appCreateAsyncThunk(
    'getAIdata',
    async ({ question }: { question: any }) => {
        return await CalculatorsServices.getAIdata(question)
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
            const index = state.calculators.findIndex((item) => {
                return item.Metal === calculatorData?.Metal && item.MetalType === calculatorData?.MetalType && item.MetalWeightType === calculatorData?.MetalWeightType
            })
            if (index !== -1) {
                const data = state.calculators.splice(index, 1)
                data[0].Metal = calculatorData?.Metal
                data[0].MetalWeight = Number(data[0].MetalWeight) + Number(calculatorData?.MetalWeight)
                data[0].MetalWeightType = calculatorData?.MetalWeightType
                data[0].MetalType = calculatorData?.MetalType
                state.calculators.unshift(data[0])
            } else {
                state.calculators.push(calculatorData);
            }
        },
        removeCalculator(state, action) {
            const calculatorIndex = action.payload;
            state.calculators.splice(calculatorIndex, 1)
        },
        resetCalculatorData(state) {
            state.loading = false
            state.calculatorType = 0
            state.calculators = []
            state.shipping = 0.00
            state.insurance = 0.00
            state.vaultStorage = 0.00
            state.openai = []
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

        builder.addCase(getAIdata.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAIdata.fulfilled, (state, action) => {
            const responseData = action?.payload?.data?.data;
            state.openai = responseData;
            state.loading = false;
        })
        builder.addCase(getAIdata.rejected, (state) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, addCalculator, removeCalculator, resetCalculatorData } = calculatorsPagesSlice.actions;

export default calculatorsPagesSlice.reducer
