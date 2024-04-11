import RenderFields from '@/components/common/RenderFields'
import React, { useState } from 'react'
import { Box, Button, MenuItem, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import BasicDatePicker from "./BasicDatePicker"
import { parseDate } from '@internationalized/date'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getBuyBackOrderHistory, getOrderHistory } from '@/redux/reducers/myVaultReducer'
import { ENDPOINTS } from '@/utils/constants'
import { requestBodyOrderHistory } from '@/pages/my-vault/buy-back-order-history'
interface OrderDateInputs {
    OrderStatus: string
}

const schema = yup.object().shape({
    OrderStatus: yup.string().trim().required("Order Status is required field"),
});

const defaultDate = { // need to change currently it set as random
    start: parseDate("2020-02-08"),
    end: parseDate("2020-02-08")
}

const OrderDateStatusSelector = ({ orderHistoryType }: { orderHistoryType: "buy-pack" | "normal" }) => {
    // console.log("🚀 ~ OrderDateStatusSelector ~ orderHistoryType:", orderHistoryType)
    const dispatch = useAppDispatch();
    const [dateRangeValue, setDateRangeValue] = useState(defaultDate);
    const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<OrderDateInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        const service = orderHistoryType === "buy-pack" ? getBuyBackOrderHistory : getOrderHistory;
        const endPoint = orderHistoryType === "buy-pack" ? ENDPOINTS.getBuyBackOrderHistory : ENDPOINTS.getOrderHistory

        const response = await dispatch(service({
            url: endPoint, body: {
                ...requestBodyOrderHistory, filters: {
                    fromDate: dateRangeValue.start.toString(),
                    toDate: dateRangeValue.end.toString(),
                    orderStatusId: data.OrderStatus
                }
            }
        }))
    }

    const clearFiltersHandler = async () => {
        const service = orderHistoryType === "buy-pack" ? getBuyBackOrderHistory : getOrderHistory;
        const endPoint = orderHistoryType === "buy-pack" ? ENDPOINTS.getBuyBackOrderHistory : ENDPOINTS.getOrderHistory

        const response = dispatch(service({ url: endPoint, body: requestBodyOrderHistory }));
        reset();
        setDateRangeValue(defaultDate)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="OrderDateStatusSelector" className='OrderDateStatusSelector'>
                <Stack className='OrderDateStatusSelectorWrapper'>
                    <Stack className='OrderDateStatusWrapper'>
                        <Box className="DateCalenderWrapper">
                            <BasicDatePicker dateRangeValue={dateRangeValue} setDateRangeValue={setDateRangeValue} />
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
                                setValue={setValue}
                                margin='none'
                                // required
                                className='SelectOrderStatus'
                            >
                                {orderHistoryType === "buy-pack" ? (configDropdowns?.buybackOrderStatusList.map(status => <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>)) : (configDropdowns?.orderStatusList.map(status => <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>))}
                            </RenderFields>
                        </Box>
                    </Stack>
                    <Stack className="ButtonsWrapper">
                        <Button variant="contained" type="submit" size="large" color='primary' className="SearchButton">Search</Button>
                        <Button variant="contained" size="large" color='info' onClick={clearFiltersHandler}>Clear</Button>
                    </Stack>
                </Stack>
            </form>
        </>
    )
}

export default OrderDateStatusSelector
