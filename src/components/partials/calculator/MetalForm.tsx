import React, { useEffect } from 'react'
import { Box, Stack, MenuItem, Button } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RenderFields from '@/components/common/RenderFields';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addCalculator, saveCalculatorsData } from '@/redux/reducers/calculatorsReducer';
import { ENDPOINTS } from '@/utils/constants';

interface Inputs {
    SelectMetal?: number| string,
    Weight?: number,
    MetalType?: number,
    WeightType?: number
}

const schema = yup.object().shape({
    SelectMetal: yup.string().notOneOf(["none"], "Metal selection is required"),
    Weight: yup
        .number()
        .nullable()
        .transform((value, originalValue) => {
            // Transform empty strings to null, which will trigger the 'required' validation
            return originalValue === "" ? null : value;
        })
        .positive("Weight must be a positive number")
        .required("Weight is required"),
    MetalType: yup.string().required("Metal type is required"),
    WeightType: yup.string().required("Weight type is required")
});

const MetalForm = ({ CalculatorType }: { CalculatorType: number }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.calculators.loading);
    const calculators = useAppSelector(state => state.calculators.calculators);

    useEffect(() => {
        setValue('SelectMetal', 'none')
    },[])

    const {
        register,
        reset,
        handleSubmit,
        clearErrors,
        getValues,
        control,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const handleFormSubmission = (data: any) => {
        const calculatorData = {
            Metal: Number(data.SelectMetal),
            MetalType: Number(data.MetalType),
            MetalWeight: Number(data.Weight),
            MetalWeightType: Number(data.WeightType)
        }

        dispatch(addCalculator(calculatorData));
        reset();
        setValue('SelectMetal', "none")
    }
    useEffect(() => {
        dispatch(saveCalculatorsData({
            url: ENDPOINTS.saveCalculators,
            body: {
                CalculatorType: CalculatorType,
                CalculatorData: [...calculators]
            }
        }) as any);

        return () => {

        }
    }, [calculators?.length])

    return (
        <form onSubmit={handleSubmit(handleFormSubmission)}>
            <Box className="SelectionWrapper">
                <Stack
                    className='MetalWrapper'>
                    <RenderFields
                        type="select"
                        register={register}
                        error={errors.SelectMetal}
                        name="SelectMetal"
                        label="Select Metal"
                        setValue={setValue}
                        getValues={getValues}
                        control={control}
                        clearErrors={clearErrors}
                        defaultValue="none"
                        variant='outlined'
                        margin='none'
                        className='SelectMetal'
                    >
                        {/* {Note:- refer to types/enums.ts file for reference of value of input} */}
                        <MenuItem value="none" selected>Select Metal</MenuItem>
                        <MenuItem value="1">Gold</MenuItem>
                        <MenuItem value="2">Silver</MenuItem>
                        <MenuItem value="3">Platinum</MenuItem>
                        <MenuItem value="4">Palladium</MenuItem>
                        {/* <MenuItem value="11">Copper</MenuItem> */}
                    </RenderFields>
                    {/* {Note:- refer to types/enums.ts file for reference for value of the input} */}
                    <RenderFields
                        type="radio"
                        register={register}
                        error={errors.MetalType}
                        name="MetalType"
                        setValue={setValue}
                        label="Metal Type"
                        control={control}
                        margin='none'
                        className='MetalType'
                        options={[
                            { id: '1', name: 'Bar', value: '0', label: 'Bar' },
                            { id: '2 ', name: 'Coin', value: '1', label: 'Coin' },
                        ]}
                        row
                        onChange={() => clearErrors("MetalType")} // Clear error on selection
                    />
                </Stack>
                <Stack className='WeightWrapper'>
                    <RenderFields
                        register={register}
                        error={errors.Weight}
                        name="Weight"
                        label="Weight"
                        type="number"
                        placeholder="Enter Weight"
                        control={control}
                        variant='outlined'
                        margin='none'
                        className='Weight'
                        setValue={setValue}
                    />
                    {/* {Note:- refer to types/enums.ts file for reference for value of the input} */}
                    <RenderFields
                        type="radio"
                        register={register}
                        error={errors.WeightType}
                        name="WeightType"
                        label="Weight Type"
                        control={control}
                        setValue={setValue}
                        margin='none'
                        className='WeightType'
                        onChange={() => clearErrors("WeightType")} // Clear error on selection
                        options={[
                            { id: '1', name: 'Ounces', value: '0', label: 'Ounces' },
                            { id: '2 ', name: 'Grams', value: '1', label: 'Grams' },
                            { id: '3 ', name: 'Kilograms', value: '2', label: 'Kilograms' },
                        ]}
                        row
                    />
                </Stack>
                <Button className='AddMetaltBtn' size='large' variant="contained" type="submit" disabled={loading}>Add Metal</Button>
            </Box>
        </form>
    )
}

export default MetalForm