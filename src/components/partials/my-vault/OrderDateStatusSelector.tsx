import RenderFields from '@/components/common/RenderFields'
import React from 'react'
import { Box, Button, MenuItem, Typography, Stack, Divider, } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import BasicDatePicker from "./BasicDatePicker"
interface OrderDateInputs {
    OrderStatus: string
}

const schema = yup.object().shape({
    OrderStatus: yup.string().trim().required(),
});

const OrderDateStatusSelector = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<OrderDateInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="OrderDateStatusSelector" className='OrderDateStatusSelector'>
                <Stack className='OrderDateStatusSelectorWrapper'>
                    <Stack className='OrderDateStatusWrapper'>
                        <Box className="DateCalenderWrapper">
                            <BasicDatePicker />
                        </Box>
                        <Box className="SelectStatusWrapper">
                            <RenderFields
                                type="select"
                                register={register}
                                error={errors.OrderStatus}
                                name="OrderStatus"
                                control={control}
                                placeholder="Select Order Status"
                                variant='outlined'
                                margin='none'
                                // required
                                className='SelectOrderStatus'
                            >
                                <MenuItem key="" value="none">Select Order Status</MenuItem>
                                <MenuItem key="" value="pending">pending</MenuItem>
                                <MenuItem key="" value="processing">processing</MenuItem>
                                <MenuItem key="" value="completed">completed</MenuItem>
                            </RenderFields>
                        </Box>
                    </Stack>
                    <Stack className="ButtonsWrapper">
                        <Button variant="contained" type="submit" size="large" color='primary' className="SearchButton">Search</Button>
                        <Button variant="contained" size="large" color='info'>Clear</Button>
                    </Stack>
                </Stack>
            </form>
        </>
    )
}

export default OrderDateStatusSelector
